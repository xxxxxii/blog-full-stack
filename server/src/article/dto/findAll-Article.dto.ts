import { ApiProperty } from '@nestjs/swagger';

/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 22:22:01
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-07 16:43:06
 * @FilePath: \blog-full-stack\server\src\article\dto\findAll-Article.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class FindAllArticleDto {
  @ApiProperty({ description: '查询title字段', required: false })
  keyWord: string;

  @ApiProperty({ description: '页码', required: false })
  page: number;

  @ApiProperty({ description: '页数量', required: false })
  pageSize: number;

  @ApiProperty({ description: '用户id', required: false })
  userId: string;

  @ApiProperty({ description: 'label id', required: false })
  labelId: string;

  @ApiProperty({ description: 'group id', required: false })
  groupId: number;
}
