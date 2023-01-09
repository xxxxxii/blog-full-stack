/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 15:44:21
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-07 16:40:48
 * @FilePath: \blog-full-stack\server\src\article\article.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindAllArticleDto } from './dto/findAll-Article.dto';
import { Public } from 'src/common/public.decorator';

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: '新增文章' })
  create(@Body() createArticleDto: CreateArticleDto, @Req() req) {
    if (req.user.userId) {
      return this.articleService.create(createArticleDto, req.user.userId);
    }
  }

  @Public()
  @Get('plugins')
  @ApiOperation({ summary: '插件扩展' })
  plugins(@Query() query) {
    return this.articleService.findAllPlugins(query);
  }

  @Public()
  @Get('articleByLabelId')
  @ApiOperation({ summary: '标签内的文章' })
  selectByLabelId(@Query() query: FindAllArticleDto) {
    return this.articleService.selectByLabelId(query);
  }

  @Public()
  @Get('articleByGroupId')
  @ApiOperation({ summary: '文章分类的文章' })
  selectByGroupId(@Query() query: FindAllArticleDto) {
    return this.articleService.selectByGroupId(query);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '文章列表' })
  findAll(@Query() query: FindAllArticleDto) {
    return this.articleService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '文章编辑' })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
