import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      return next.handle().pipe(
        map((data) => {
          // pipe call to add / modify header(s) after remote method
          let req = context.switchToHttp().getRequest();
          return data;
        }),
      );
    }

}
