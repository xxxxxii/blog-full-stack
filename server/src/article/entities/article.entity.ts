/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 11:01:23
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-21 20:14:40
 * @FilePath: \blog-full-stack\server\src\user\entities\user.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Comment } from 'src/comments/entities/comment.entity';
import { Group } from 'src/group/entities/group.entity';
import { Label } from 'src/label/entities/label.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PublicCloumn } from '../../entities.public';

const ArticleType = {
  DEFAULT: 0,
  WEBPLUGINS: 1,
  SERVEPLUGINS: 2,
};

@Entity()
export class Article extends PublicCloumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  bf: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ default: null })
  img: string;

  @Column({ default: 0 })
  readCount: number;

  @Column({ default: null })
  fileSha: string;

  @Column({ default: null })
  imgType: string;

  @Column({ default: null })
  brief: string;

  @Column({ type: 'enum', enum: ArticleType, default: ArticleType.DEFAULT })
  type: number;

  // 关联label
  @ManyToMany((type) => Label, (label) => label.articles, {
    cascade: true,
  })
  @JoinTable()
  labels: Label[];

  // 关联分类
  @ManyToOne(() => Group, (group) => group.articles, {
    cascade: true,
  })
  group: Group;

  // 关联用户 文章对应一个用户，多对一
  @ManyToOne(() => User, (user) => user.articles, {
    cascade: true,
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Article[];
}
