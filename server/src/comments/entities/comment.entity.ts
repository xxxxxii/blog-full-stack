/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-20 20:52:32
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-22 00:24:56
 * @FilePath: \blog-full-stack\server\src\comments\entities\comment.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Article } from 'src/article/entities/article.entity';
import { PublicCloumn } from 'src/entities.public';
import { User } from 'src/user/entities/user.entity';
import { Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class Comment extends PublicCloumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Article, (article) => article.comments, {
    cascade: true,
  })
  @JoinColumn()
  article: Article;

  @Column({ default: '0' })
  parentId: string;

  @Column({ type: 'text', default: null })
  content: string;

  // 关联用户 文章对应一个用户，多对一
  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true,
  })
  @JoinColumn()
  user: User;

  // 回复目标的用户Id
  @ManyToOne(() => User, (user) => user.toComments, {
    cascade: true,
  })
  @JoinColumn()
  toUser: User;
}
