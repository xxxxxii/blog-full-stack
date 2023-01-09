/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 22:39:27
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-09 20:22:39
 * @FilePath: \blog-full-stack\server\src\label\entities\label.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Article } from 'src/article/entities/article.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { PublicCloumn } from '../../entities.public';

@Entity()
export class Label extends PublicCloumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  // @OneToMany(() => ArticleLabel, (articleLabel) => articleLabel.label)
  // articleLabel: ArticleLabel[];
  @ManyToMany((type) => Article, (article) => article.labels) // 建立bi-directional多对多
  @JoinTable() // 告訴typeorm要建立join table
  articles: Article[];
}
