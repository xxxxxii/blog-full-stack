/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 15:44:21
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 21:14:44
 * @FilePath: \blog-full-stack\server\src\article\dto\update-article.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  fileSha: string;
  imgChange: boolean;
  user: any;
}
