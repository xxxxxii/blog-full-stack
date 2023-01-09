/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 22:39:27
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-14 15:02:52
 * @FilePath: \blog-full-stack\server\src\label\label.controller.ts
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
  UseGuards,
} from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { FindAllLabelDto } from './dto/findAll-label.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('label')
@ApiTags('标签')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '标签新增' })
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelService.create(createLabelDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '标签列表' })
  findAll(@Query() query: FindAllLabelDto) {
    return this.labelService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '标签详情' })
  findOne(@Param('id') id: string) {
    return this.labelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '标签编辑' })
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelService.update(id, updateLabelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '标签删除' })
  remove(@Param('id') id: string) {
    return this.labelService.remove(id);
  }
}
