/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-25 11:15:15
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 18:57:55
 * @FilePath: \blog-full-stack\server\src\group\group.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';

@ApiTags('文章分组')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: '文章分组新增' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: '分组列表' })
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '分组详情' })
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '分组更新' })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '分组删除' })
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
