/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-25 11:15:15
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-26 20:43:21
 * @FilePath: \blog-full-stack\server\src\group\entities\group.entity.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Article } from 'src/article/entities/article.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PublicCloumn } from '../../entities.public';

@Entity()
export class Group extends PublicCloumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @OneToMany(() => Article, (article) => article.group)
  articles: Article[];
}
