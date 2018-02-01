import { ExceptionFilter } from "@nestjs/common/interfaces";
import { Catch, HttpException, InternalServerErrorException } from "@nestjs/common";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  catch(exception, response) {
    response.status(500).json({
      statusCode: 500,
      message: 'InternalServerError'
    })
  }
}