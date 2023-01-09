/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 15:44:21
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-23 23:56:05
 * @FilePath: \blog-full-stack\server\src\article\article.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindAllArticleDto } from './dto/findAll-Article.dto';
import {
  Repository,
  Like,
  Any,
  getConnection,
  createQueryBuilder,
} from 'typeorm';
import { EntityManager, getManager } from 'typeorm';
import { Article } from './entities/article.entity';
// import { ArticleLabel } from './entities/article_label.entity';
import { LabelService } from 'src/label/label.service';
import { UserService } from 'src/user/user.service';
import { Label } from 'src/label/entities/label.entity';
import { User } from 'src/user/entities/user.entity';
import { GroupService } from 'src/group/group.service';

const axios = require('axios');
const https = require('https');

// 创建忽略 SSL 的 axios 实例

const ignoreSSL = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// 在 axios 请求时，选择性忽略 SSL

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function deleteImg(data) {
  return new Promise((rev, rej) => {
    let url = `https://api.github.com/repos/xxxxxii/blogcdn/contents/img/${data.id}.${data.img_type}`;
    axios
      .delete(url, {
        params: {
          branch: 'main',
          sha: data.sha,
          message: 'serve delete img',
        },
        headers: {
          authorization: 'token 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',
        },
      })
      .then((res) => {
        rev(res);
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
}

function imgUploadToGithub(params) {
  let body = {};
  // 更新
  if (params.sha) {
    body = {
      sha: params.sha,
      branch: 'main',
      content: params.img.split('base64,')[1],
      message: 'Update By yl Server',
    };
  } else {
    // 上传
    body = {
      branch: 'main',
      content: params.img.split('base64,')[1],
      message: 'Update By yl Server',
    };
  }
  return new Promise((rev, rej) => {
    axios
      .put(
        `https://api.github.com/repos/xxxxxii/blogcdn/contents/img/${params.id}.${params.imgType}`,
        body,
        {
          httpsAgent: agent,
          headers: {
            authorization: 'token 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',
          },
        },
      )
      .then((tuchangRes) => {
        console.log(tuchangRes);
        rev(tuchangRes);
      })
      .catch((err) => {
        // console.log(err);
        rej(err);
      });
  });
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>, // @InjectRepository(ArticleLabel) // private readonly articleLabel: Repository<ArticleLabel>,
    private userService: UserService,
    private groupService: GroupService,
    private labelService: LabelService,
  ) {}
  async create(createArticleDto: CreateArticleDto, id: string) {
    try {
      const saveArticle = new Article();
      saveArticle.user = await this.userService.getUserById(id);
      saveArticle.group = await this.groupService.getGroupById(
        createArticleDto.group,
      );
      saveArticle.title = createArticleDto.title;
      saveArticle.bf = createArticleDto.bf;
      saveArticle.imgType = createArticleDto.imgType;
      saveArticle.content = createArticleDto.content;

      saveArticle.labels = await this.labelService.getLabelsByIds(
        createArticleDto.labels,
      );

      const articleRes = await this.article.save(saveArticle);
      // 图片上传github 图床
      if (createArticleDto.img && createArticleDto.img != '') {
        const tuchangRes: any = await imgUploadToGithub({
          id: articleRes.id,
          imgType: 'png',
          img: createArticleDto.img,
        }).catch((err) => {
          console.log(err, 'err');
          return {
            code: 0,
            msg: 'github 图床上传错误',
          };
        });

        let baseUrl = 'https://cdn.staticaly.com/gh/xxxxxii/blogcdn/main/';
        let showimgUrl = baseUrl + tuchangRes.data.content.path;
        let fileSha = tuchangRes.data.content.sha;

        // 图片地址存储数据库
        const saveImg = await this.article.update(articleRes.id, {
          img: showimgUrl,
          fileSha: fileSha,
          imgType: 'png',
        });
      }

      return {
        code: 200,
        msg: '新增成功！',
      };
    } catch (err) {
      return {
        code: 0,
        msg: 'err',
      };
    }
  }

  async findAll(query: FindAllArticleDto) {
    if (!query.page || !query.pageSize) {
      query.page = 1;
      query.pageSize = 10;
      console.log(query);
    }
    if (!query.keyWord) {
      query.keyWord = '';
    }
    const wherePar: any = { title: Like(`%${query.keyWord}%`) };
    if (query.userId) {
      wherePar.user = { id: query.userId };
    }
    console.log(wherePar, '  userId: string;');
    const [list, total] = await this.article.findAndCount({
      where: wherePar,
      select: {},
      relations: ['labels', 'user', 'group'],
      order: { createdAt: 'DESC' },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    return {
      code: 200,
      data: list,
      total: total,
    };
  }

  async findAllPlugins(query: FindAllArticleDto) {
    const wherePar: any = { type: '1' };
    if (query.userId) {
      wherePar.user = { id: query.userId };
    }
    const list1 = await this.article.find({
      where: wherePar,
      select: ['id', 'title', 'type'],
      order: { createdAt: 'DESC' },
    });
    const wherePar2: any = wherePar;
    wherePar2.type = '2';
    const list2 = await this.article.find({
      where: wherePar2,
      select: ['id', 'title', 'type'],
      order: { createdAt: 'DESC' },
    });
    const resData = {
      name: '插件扩展',
      children: [],
    };
    if (list1.length > 0) {
      resData.children.push({ name: '前端插件', children: list1 });
    }
    if (list2.length > 0) {
      resData.children.push({ name: '后端插件', children: list2 });
    }

    return {
      code: 200,
      data: resData,
    };
  }

  async findOne(id: string) {
    const data = await this.article.find({
      where: {
        id: id,
      },
      relations: ['labels', 'user', 'group'],
    });
    return {
      code: 200,
      data: data,
    };
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const saveArticle: UpdateArticleDto = {
      ...updateArticleDto,
    };
    saveArticle.title = updateArticleDto.title;
    saveArticle.bf = updateArticleDto.bf;
    saveArticle.content = updateArticleDto.content;
    saveArticle.user = updateArticleDto.user;
    // 图片是否修改
    const articleData = await this.article.findOneBy({ id: id });
    // 图片之前是否存在,存在，先在图床上删除在上传，不存在直接上传图床
    // 更新
    if (articleData.fileSha && updateArticleDto.imgChange) {
      const tuchangRes: any = await imgUploadToGithub({
        id: articleData.id,
        imgType: 'png',
        img: updateArticleDto.img,
        sha: articleData.fileSha,
      }).catch((err) => {
        console.log(err, 'err');
      });

      console.log(tuchangRes);
      let baseUrl = 'https://cdn.staticaly.com/gh/xxxxxii/blogcdn/main/';
      let showimgUrl = baseUrl + tuchangRes.data.content.path;
      let fileSha = tuchangRes.data.content.sha;

      saveArticle.img = showimgUrl;
      saveArticle.fileSha = fileSha;
      // }
    } else {
      if (!articleData.fileSha && updateArticleDto.imgChange) {
        // 上传
        const tuchangRes: any = await imgUploadToGithub({
          id: articleData.id,
          imgType: 'png',
          img: updateArticleDto.img,
        }).catch((err) => {
          console.log(err, 'err');
        });
        console.log(tuchangRes, 'saveImg1');
        let baseUrl = 'https://cdn.staticaly.com/gh/xxxxxii/blogcdn/main/';
        let showimgUrl = baseUrl + tuchangRes.data.content.path;
        let fileSha = tuchangRes.data.content.sha;

        saveArticle.img = showimgUrl;
        saveArticle.fileSha = fileSha;
      }
    }
    // 设置标签
    saveArticle.labels = await this.labelService.getLabelsByIds(
      updateArticleDto.labels,
    );
    saveArticle.group = await this.groupService.getGroupById(
      updateArticleDto.group,
    );
    const result = await this.article.save(saveArticle);
    if (result) {
      return { code: 200, data: result, msg: '修改成功' };
    } else {
      return { code: 200, msg: 'update err' };
    }
  }
  remove(id: string) {
    return this.article.delete(id);
  }

  async selectByLabelId(query: FindAllArticleDto) {
    console.log(query);
    if (!query.page || !query.pageSize) {
      query.page = 1;
      query.pageSize = 10;
    }
    let wherePar = ` where `;
    if (query.userId) {
      wherePar += `article.userId='${query.userId}' and `;
    }
    if (query.labelId) {
      wherePar += `article_labels_label.labelId='${query.labelId}' and `;
    }
    wherePar = wherePar.substring(0, wherePar.lastIndexOf('and'));
    console.log(wherePar);
    const res = await this.article.query(
      `select * from article left join article_labels_label  on article.id = article_labels_label.articleId` +
        wherePar +
        ';',
    );
    // find({
    //   where: wherePar,
    // });
    return {
      code: 200,
      data: res,
    };
  }

  async selectByGroupId(query: FindAllArticleDto) {
    const res = await this.article.find({
      where: { group: { id: query.groupId } },
    });
    return {
      code: 200,
      data: res,
    };
  }
  getArticleById(id: string) {
    return this.article.findOneById(id);
  }
}
