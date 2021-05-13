import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from 'express';
import { DomainException } from "src/users/domain/exception/domain.exception";

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response
        .status(400)
        .json({
          statusCode: 400,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message
        });
    }

}
