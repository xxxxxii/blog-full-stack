/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 04:18:17
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-23 22:59:43
 * @FilePath: \blog-full-stack\server\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'yl-blog',
      name: 'yl-blog.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  const logger: Logger = new Logger('main.ts');
  const config = new DocumentBuilder()
    .setTitle('Blog Api Docs')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  logger: ['log', 'debug', 'error', 'warn'];

  app.enableCors({
    origin: ['http://139.159.200.153', 'http://localhost:3000'],
    credentials: true,
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(4000);
  logger.log(`服务已经启动,接口请访问:http://localhost:4000/api-docs`);
}
bootstrap();
