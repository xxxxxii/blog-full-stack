/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-20 20:52:32
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-20 21:55:09
 * @FilePath: \blog-full-stack\server\src\comments\comments.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { UserService } from 'src/user/user.service';
import { ArticleService } from 'src/article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Article } from 'src/article/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { GroupService } from 'src/group/group.service';
import { LabelService } from 'src/label/label.service';
import { AuthService } from 'src/auth/auth.service';
import { Label } from 'src/label/entities/label.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Article, User, Group, Label])],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    ArticleService,
    UserService,
    GroupService,
    LabelService,
    AuthService,
    JwtService,
  ],
})
export class CommentsModule {}
