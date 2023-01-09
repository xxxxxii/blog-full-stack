/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 11:01:23
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-21 20:18:36
 * @FilePath: \blog-full-stack\server\src\user\user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UserBasic } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { User } from './entities/user.entity';
import { Repository, Like, Code } from 'typeorm';
// 引入加密函数
import { comparePassword, encryptPassword } from '../utils/cryptogram';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const isExUser = await this.user.findBy({
      username: createUserDto.username,
    });
    if (isExUser.length > 0) {
      return {
        msg: 'The user name is already registered',
        code: '0',
      };
    }
    // const createUserData = new CreateUserDto();
    // createUserData.username =
    createUserDto.password = encryptPassword(createUserDto.password, 10);

    // const hashPassword = encryptPassword(createUserDto.password, 10);

    const createRes = await this.user.save(createUserDto);
    if (createRes) {
      return {
        code: 200,
        msg: '您已注册成功',
      };
    }
    return {
      code: 0,
      msg: '注册err',
    };
  }

  async findAll(query: FindAllUserDto) {
    if (!query.page || !query.pageSize) {
      query.page = 1;
      query.pageSize = 10;
      console.log(query);
    }
    if (!query.keyWord) {
      query.keyWord = '';
    }
    const data = await this.user.find({
      where: {
        username: Like(`%${query.keyWord}%`),
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.user.count({
      where: {
        username: Like(`%${query.keyWord}%`),
      },
    });

    return {
      code: 200,
      data: data,
      total: total,
    };
  }

  async findOne(id: string) {
    const userRes = await this.user.find({
      where: { id: id },
      select: ['username', 'qq', 'email', 'avatar', 'role', 'brief'],
    });
    return {
      code: 200,
      data: userRes,
    };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto, id);
    return this.user.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.user.delete(id);
  }
  async getUserById(id: string) {
    return await this.user.findOneById(id);
  }
  // 用户登录
  async login(data: UserBasic) {
    const userInfo = await this.user.findOneBy({ username: data.username });

    const compare = comparePassword(data.password, userInfo.password);
    console.log(compare);
    if (compare) {
      const token = await this.authService.GenerateToken(userInfo.id);
      return {
        code: 200,
        msg: 'login success',
        data: {
          token: token,
          userInfo: userInfo,
        },
      };
    }
    return {
      code: 0,
      msg: '账号密码错误',
    };
  }
}
