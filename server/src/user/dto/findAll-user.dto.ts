/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 12:33:28
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-08 22:24:16
 * @FilePath: \blog-full-stack\server\src\user\dto\findAll-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';
export class FindAllUserDto {
  @ApiProperty({ description: '查询username 字段', required: false })
  keyWord: string;

  @ApiProperty({ description: '页码', required: false, default: 1 })
  page: number;

  @ApiProperty({ description: '页数量', required: false, default: 10 })
  pageSize: number;
}
