import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  createParamDecorator,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
// export function UrlMain() {
//   return UseInterceptors(new MainInterceptor());
// }
export const MainInterceptor: NestInterceptor = {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const protocol = request.protocol;
    const host = request.get('host');

    const baseUrl = `${protocol}://${host}`;
    request['url'] = baseUrl;
    // return baseUrl;
    // console.log(baseUrl, 'baseUrl');
    return next.handle();
  },
};
