/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-25 11:15:15
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 11:42:48
 * @FilePath: \blog-full-stack\server\src\group\group.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
