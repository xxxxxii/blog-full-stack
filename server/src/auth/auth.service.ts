/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-11 03:15:54
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-11 04:55:49
 * @FilePath: \blog-full-stack\server\src\auth\auth.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  GenerateToken(id) {
    return this.jwtService.sign(
      {
        id: id,
      },
      {
        secret: process.env.SECRET,
      },
    );
  }
}
