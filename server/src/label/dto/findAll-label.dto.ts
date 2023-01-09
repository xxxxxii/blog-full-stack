/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 22:59:28
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-09 16:38:01
 * @FilePath: \blog-full-stack\server\src\label\dto\findAll-label.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';

export class FindAllLabelDto {
  @ApiProperty({ description: '查询name关键字', required: false })
  keyWord: string;

  @ApiProperty({ description: '是否获取全部数据', required: false })
  isAll: boolean;

  @ApiProperty({ description: '页码', required: false })
  page: number;

  @ApiProperty({ description: '页数量', required: false })
  pageSize: number;
}
