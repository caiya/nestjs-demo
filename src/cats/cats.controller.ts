import { Get, Controller, HttpCode, Query, Param, Post, Body, HttpException, Delete, HttpStatus, UseFilters } from '@nestjs/common';

import { CreateCatDto } from './dto/cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { HttpExceptionFilter } from '../common/filters/httpException.filter';
import { ForbiddenException } from '../common/exceptions/forbidden.exception';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())   // controller级别的filter拦截
export class CatsController {

  constructor(private readonly catsService: CatsService) { };    // 将catSerivce加进来

  @Post()
  async post( @Body() createCatDto: CreateCatDto): Promise<void> {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Delete()
  @UseFilters(new HttpExceptionFilter())
  async deleteOne() {
    throw new ForbiddenException()
    // throw new HttpException({
    //   error: 'This is a custom message',
    //   code: 10010,
    // }, HttpStatus.FORBIDDEN)
  }
}