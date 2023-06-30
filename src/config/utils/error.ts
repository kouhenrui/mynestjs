/**
 * 定义全局异常
 * 由此注入指定的http异常
 * 由any-exception.filter 进行全局捕获返回异常信息
 * 异常信息返回格式: { data?: 返回数据, errorMsg: 返回给前端的异常信息, errorCode?: 返回给前端的异常code, errorInfo?: 捕获的异常记录日志 }, http_status: http状态码
 **/
import { HttpException, UnauthorizedException, HttpStatus } from '@nestjs/common'
export class CustomException extends HttpException {
  constructor(message: string, statusCode?: HttpStatus) {
    super({message, statusCode:statusCode||600},600);
  }
}
