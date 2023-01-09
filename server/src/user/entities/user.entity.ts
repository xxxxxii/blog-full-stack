/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 11:01:23
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-22 00:24:18
 * @FilePath: \blog-full-stack\server\src\user\entities\user.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Article } from 'src/article/entities/article.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PublicCloumn } from '../../entities.public';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost',
}

@Entity()
export class User extends PublicCloumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GHOST })
  role: UserRole;

  @Column({ default: null })
  open_id: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  qq: string;

  @Column({ default: null })
  brief: string;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Comment, (comment) => comment.toUser)
  toComments: Comment[];
}
