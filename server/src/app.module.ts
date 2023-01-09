/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 04:18:17
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 11:19:24
 * @FilePath: \blog-full-stack\server\src\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { LabelModule } from './label/label.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { GroupModule } from './group/group.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'Zyl123..',
      host: '139.159.200.153',
      port: 3306,
      database: 'blog',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 数据模型同步
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true,
    }),
    UserModule,
    ArticleModule,
    LabelModule,
    AuthModule,
    GroupModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
