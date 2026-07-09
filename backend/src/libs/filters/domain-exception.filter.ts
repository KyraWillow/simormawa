import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
  InvalidCredentialsError,
  UserError,
} from '../../modules/user/domain/user.errors';

@Catch(UserError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: UserError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusMap: Record<string, number> = {
      UserAlreadyExistsError: HttpStatus.CONFLICT,
      UserNotFoundError: HttpStatus.NOT_FOUND,
      InvalidCredentialsError: HttpStatus.UNAUTHORIZED,
    };

    const status = statusMap[exception.constructor.name] ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.constructor.name,
    });
  }
}
