/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 15:44:21
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 12:42:21
 * @FilePath: \blog-full-stack\server\src\article\article.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { LabelService } from 'src/label/label.service';
import { Label } from 'src/label/entities/label.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Group } from 'src/group/entities/group.entity';
import { GroupService } from 'src/group/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Label, User, Group])],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    LabelService,
    UserService,
    GroupService,
    AuthService,
    JwtService,
  ],
})
export class ArticleModule {}
