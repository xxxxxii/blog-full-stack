/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 13:11:01
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-08 13:13:58
 * @FilePath: \blog-full-stack\server\src\entities.public\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
export class PublicCloumn {
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateAt: Date;
}
