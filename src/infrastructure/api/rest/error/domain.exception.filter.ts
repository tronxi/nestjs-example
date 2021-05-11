import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { DomainException } from "src/domain/exception/domain.exception";
import { Request, Response } from 'express';

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
