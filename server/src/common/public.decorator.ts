/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-11 12:21:55
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-11 12:22:12
 * @FilePath: \blog-full-stack\server\src\common\auth.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//  /src/common/decorator/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
