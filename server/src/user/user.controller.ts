/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-08 11:01:23
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-23 22:58:06
 * @FilePath: \blog-full-stack\server\src\user\user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Req,
  Session,
  Headers,
  Header,
  Head,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserBasic } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserDto } from './dto/findAll-user.dto';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Public } from 'src/common/public.decorator';
//引入验证码
import * as svgCaptcha from 'svg-captcha';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '用户注册' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: '用户列表' })
  findAll(@Query() query: FindAllUserDto) {
    return this.userService.findAll(query);
  }
  @Public()
  @Get('test1')
  @ApiOperation({ summary: '用户列表1' })
  findAll1(@Query() query: FindAllUserDto) {
    return {
      msg: '43434343',
    };
  }

  // 用户验证码
  @Public()
  @Get('code')
  @ApiOperation({ summary: '用户验证码' })
  createCaptcha(@Req() req, @Res() res) {
    //验证码
    const captcha = svgCaptcha.create({
      size: 4, //字符的个数
      fontSize: Math.floor(Math.random() * 10) + 40, //生成40~50大小的验证码
      width: 120, //宽度
      height: 32, //高度
      ignoreChars: '0oO1ilI',
      noise: 2, // 干扰线
      color: true,
      background: '#eee',
    });

    //存储验证码记录到session

    req.session.code = captcha.text;
    req.session.cookie.code = captcha.text;
    console.log(req.session);
    //设置返回值类型，并返回
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: '用户信息' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '用户信息更新' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // 用户登录
  @Public()
  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  login(@Body() body: UserBasic, @Session() session, @Req() req) {
    console.log(session, req.session, body.code, 'code');
    if (
      session?.code?.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return this.userService.login(body);
    } else {
      return {
        code: 0,
        msg: '验证码错误',
      };
    }
  }
}
