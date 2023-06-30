import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../config/log4js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const error_info = exception.response ? exception.response : exception;
    const error_data = exception.response?.data ? exception.response.data : {};
    const error_msg = exception.response
      ? exception.response.message
        ? exception.response.message
        : exception.response.errorMsg
      : '系统繁忙，请稍后再试！';
    console.log('error_msg()',error_msg);
    const error_code = exception.response?.errorCode
      ? exception.response.errorCode
      : '-1';
    // 自定义异常结构体, 日志用
    const data = {
      timestamp: new Date().toISOString(),
      ip: request.ip,
      req_url: request.originalUrl,
      req_method: request.method,
      http_code: status >= 600 ? status : 200,
      params: request.params,
      query: request.query,
      body: request.body,
      errorData: error_data,
      errorMsg: status == 600 ? error_info.errorMsg : error_msg,
      errorCode: status == 600 ? error_info.errorInfo : error_code,
      error_info: error_info,
    };

    // 404 异常响应
    if (status === HttpStatus.NOT_FOUND) {
      data.errorMsg = `资源不存在! 接口 ${request.method} -> ${request.url} 无效!`;
    }
    Logger.error(data);
    let return_status = 200;
    if (status == 600) return_status = 200;
    if (status == 401 || status == 400) return_status = status;
    if (status == 302) return_status = status;

    // 程序内异常捕获返回
    response.status(return_status).json({
      data: data.errorData,
      msg: data.errorMsg,
      code: data.errorCode,
    });
  }
}
