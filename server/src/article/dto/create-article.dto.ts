/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 15:44:21
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 21:23:18
 * @FilePath: \blog-full-stack\server\src\article\dto\create-article.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/group/entities/group.entity';
import { Label } from 'src/label/entities/label.entity';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题', required: true })
  title: string;

  @ApiProperty({ description: '文章简介', required: true })
  bf: string;

  @ApiProperty({ description: '文章内容', required: true })
  content: string;

  @ApiProperty({ description: '文章标签id数组', required: true })
  labels: Label[];

  @ApiProperty({ description: '文章封面图' })
  img: string;

  @ApiProperty({ description: '文章封面类型（img/jpeg,img/png）' })
  imgType: string;

  @ApiProperty({ description: '文章其他备注', required: true })
  brief: string;

  @ApiProperty({ description: '文章分组id', required: true })
  group: any;
}
