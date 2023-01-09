/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 22:39:27
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-08 23:06:58
 * @FilePath: \blog-full-stack\server\src\label\dto\create-label.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';
export class CreateLabelDto {
  @ApiProperty({ description: '标签名' })
  name: string;

  @ApiProperty({ description: '标签颜色' })
  color: string;
}
