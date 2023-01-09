/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-25 11:15:15
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-26 20:43:57
 * @FilePath: \blog-full-stack\server\src\group\dto\create-group.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ description: '分组名 ', required: true })
  name: string;

  @ApiProperty({ description: '图标', required: true })
  icon: string;
}
