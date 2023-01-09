/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 11:01:23
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-29 02:08:39
 * @FilePath: \blog-full-stack\server\src\user\dto\create-user.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ApiProperty } from '@nestjs/swagger';

export class UserBasic {
  @ApiProperty({ description: '用户名 ', required: true })
  username: string;

  @ApiProperty({ description: '用户密码', required: true })
  password: string;

  @ApiProperty({ description: '用户验证码', required: true })
  code: string;
}

export class CreateUserDto extends UserBasic {
  @ApiProperty({ description: '用户邮箱' })
  email: string;

  @ApiProperty({ description: '用户头像' })
  avatar: string;

  @ApiProperty({ description: '用户qq' })
  qq: string;

  @ApiProperty({ description: '用户备注' })
  brief: string;
}
