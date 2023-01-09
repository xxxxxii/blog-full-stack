import { ApiProperty } from '@nestjs/swagger';

/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-20 20:52:32
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-23 23:40:34
 * @FilePath: \blog-full-stack\server\src\comments\dto\create-comment.dto.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class CreateCommentDto {
  @ApiProperty({ description: '文章id', required: true })
  article: string;

  @ApiProperty({ description: '评论父级id', required: false })
  parentId: string;

  @ApiProperty({ description: '评论内容', required: true })
  content: string;

  @ApiProperty({ description: '评论者id', required: true })
  user: string;

  @ApiProperty({ description: '评论目标id', required: true })
  toUser: string;

  articleId: string;
}
