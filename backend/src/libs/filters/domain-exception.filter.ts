import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusMap: Record<string, number> = {
      UserAlreadyExistsError: HttpStatus.CONFLICT,
      UserNotFoundError: HttpStatus.NOT_FOUND,
      InvalidCredentialsError: HttpStatus.UNAUTHORIZED,
      WorkProgramNotFoundError: HttpStatus.NOT_FOUND,
      EvaluationNotFoundError: HttpStatus.NOT_FOUND,
      EvaluationAlreadySubmittedError: HttpStatus.BAD_REQUEST,
      BudgetNotFoundError: HttpStatus.NOT_FOUND,
      InvalidBudgetTransitionError: HttpStatus.BAD_REQUEST,
      ProgressReportNotFoundError: HttpStatus.NOT_FOUND,
      KasNotFoundError: HttpStatus.NOT_FOUND,
      InsufficientBalanceError: HttpStatus.BAD_REQUEST,
    };

    const status = statusMap[exception.constructor.name] ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.constructor.name,
    });
  }
}
