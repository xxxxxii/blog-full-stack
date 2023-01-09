/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-09 01:57:33
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-10 19:30:08
 * @FilePath: \blog-full-stack\server\src\utils\cryptogram.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const bcryptjs = require('bcryptjs');

/**
 * Make salt
 */
export function comparePassword(password: string, libPassword): boolean {
  return bcryptjs.compareSync(password, libPassword);
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 加密次数
 */
export function encryptPassword(password: string, salt: number): string {
  return bcryptjs.hashSync(password, salt);
}
