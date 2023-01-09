/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-20 20:52:32
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-27 00:10:41
 * @FilePath: \blog-full-stack\server\src\comments\comments.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
    private articleServe: ArticleService,
    private userServe: UserService,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const createDtp = new Comment();

    createDtp.content = createCommentDto.content;

    createDtp.article = await this.articleServe.getArticleById(
      createCommentDto.article,
    );
    createDtp.user = await this.userServe.getUserById(createCommentDto.user);
    if (createCommentDto.toUser) {
      createDtp.toUser = await this.userServe.getUserById(
        createCommentDto.toUser,
      );
    }
    if (createCommentDto.parentId) {
      createDtp.parentId = createCommentDto.parentId;
    }

    const res = await this.comments.save(createDtp);
    return {
      code: 200,
      data: res,
      msg: '评论成功！',
    };
  }

  async findAll() {
    const res = await this.comments.find({
      relations: ['user'],
    });
    return {
      code: 200,
      data: res,
    };
  }

  async findOne(id: string) {
    // const articleRes = await this.userServe.getUserById(id);
    // console.log(id, articleRes, 'id');
    const res = await this.comments.find({
      where: { article: { id: id }, parentId: '0' },
      select: {
        id: true,
        createdAt: true,
        content: true,
        toUser: { id: true, username: true, avatar: true },
        user: { id: true, username: true, avatar: true },
      },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
    const result = [...res];
    const results = await Promise.all(
      result.map(async (item) => {
        // 等待异步操作完成，返回执行结果
        const res1 = await this.comments.find({
          where: {
            article: { id: id },
            parentId: item.id,
          },
          select: {
            id: true,
            createdAt: true,
            content: true,
            toUser: { id: true, username: true, avatar: true },
            user: { id: true, username: true, avatar: true },
          },
          order: { createdAt: 'DESC' },
          relations: ['user', 'toUser'],
        });
        item['children'] = res1;
      }),
    );
    return {
      code: 200,
      data: result,
    };
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
