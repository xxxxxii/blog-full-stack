/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 22:39:27
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-09 20:51:12
 * @FilePath: \blog-full-stack\server\src\label\label.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  controllers: [LabelController],
  providers: [LabelService],
  exports: [LabelService],
})
export class LabelModule {}
