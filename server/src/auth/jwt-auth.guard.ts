/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-11 12:10:11
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-11 12:10:35
 * @FilePath: \blog-full-stack\server\src\auth\jwt-auth.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
