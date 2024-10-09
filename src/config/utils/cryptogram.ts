import { genSalt, hash, compare } from 'bcrypt';
import * as crypto from 'crypto';
import conf from '..';

//生成10轮加密的盐
export async function getSalt() {
  return await genSalt(conf.saltRounds);
}
//生成加密后的字符串
export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}
//比较明文与散列加密后的密码一致性
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export async function makeRandonString(lenth: number): Promise<string> {
  return crypto.randomBytes(lenth).toString('base64');
}

export async function sign(): Promise<any> {
  const key = 'wIplkC+6Hgt7y9XtJcCjDbmLSicLLwuVqYqH4a';
  // console.log(key.length);

  const signs = 'yxEfDSW2OBOsdBzyDyZmUDQIAfOioCM3OCTwbs1zL2M=';
  const encryptedData = Buffer.from(signs, 'base64'); //将base64编码解除

  const ivLength = 16; //crypto.getCipherInfo('AES-256-CBC').ivLength;
  const iv = encryptedData.slice(0, ivLength);
  const encrypted = encryptedData.slice(ivLength);
  // console.log(iv.length, encrypted.length);
  const decipher = crypto.createDecipheriv(
    'AES-256-CBC',
    key.substring(0, 32),
    iv,
  );
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  // console.log(decrypted.toString());
  return decrypted.toString();
  // console.log(decrypted.toLocaleString());
  // return decrypted.toString();
  // const dataBuffer = Buffer.from(data, 'base64');
  // const ivLength = 16; // 由于 PHP 使用的是 AES-256-CBC，IV 长度为 16 字节
  // const iv = dataBuffer.slice(0, ivLength);
  // const encrypted = dataBuffer.slice(ivLength);

  // const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  // let decrypted = decipher.update(encrypted);
  // decrypted = Buffer.concat([decrypted, decipher.final()]);
}

