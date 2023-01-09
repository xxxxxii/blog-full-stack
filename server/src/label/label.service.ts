/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 22:39:27
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-07 12:19:15
 * @FilePath: \blog-full-stack\server\src\label\label.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { FindAllLabelDto } from './dto/findAll-label.dto';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label) private readonly label: Repository<Label>,
  ) {}
  async create(createLabelDto: CreateLabelDto) {
    const isEx = await this.label.findBy({ name: createLabelDto.name });
    if (isEx.length > 0) {
      return {
        code: 0,
        msg: 'this label name is already exist',
      };
    }
    return this.label.save(createLabelDto);
  }

  async findAll(query: FindAllLabelDto) {
    if (!query.page || !query.pageSize) {
      query.page = 1;
      query.pageSize = 10;
      console.log(query);
    }
    if (!query.keyWord) {
      query.keyWord = '';
    }

    if (query.isAll) {
      const allData = await this.label.find();
      return {
        code: 200,
        data: allData,
      };
    }

    const data = await this.label.find({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.label.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });

    return {
      code: 200,
      data: data,
      total: total,
    };
  }

  async findOne(id: string) {
    const res = await this.label.find({
      where: { id: id },
      select: {},
      relations: ['articles'],
      order: { createdAt: 'DESC' },
    });
    return {
      code: 200,
      data: res,
    };
  }

  update(id: string, updateLabelDto: UpdateLabelDto) {
    return this.label.update(id, updateLabelDto);
  }

  remove(id: string) {
    return this.label.delete(id);
  }

  async getLabelsByIds(ids) {
    return await this.label.findByIds(ids);
  }

  async getLabelsById(id) {
    return await this.label.findOneBy({ id: id });
  }
}
