/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-25 11:15:15
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 12:39:58
 * @FilePath: \blog-full-stack\server\src\group\group.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly group: Repository<Group>,
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const isEx = await this.group.findBy({
      name: createGroupDto.name,
    });
    if (isEx.length > 0) {
      return {
        code: 0,
        msg: 'this isExist',
      };
    }
    const saveRes = await this.group.save(createGroupDto);
    if (saveRes) {
      return {
        code: 200,
        msg: '添加成功',
      };
    }
  }

  async findAll() {
    const allRes = await this.group.find({
      order: { createdAt: 'DESC' },
    });

    return {
      code: 200,
      data: allRes,
    };
  }

  async findOne(id: number) {
    const res = await this.group.findOneById(id);
    return {
      code: 200,
      data: res,
    };
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.group.update(id, updateGroupDto);
  }

  remove(id: number) {
    return this.group.delete(id);
  }

  async getGroupById(id: number) {
    return await this.group.findOneById(id);
  }
}
