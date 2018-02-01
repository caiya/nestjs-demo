import { Get, Controller, HttpCode, Query, Param, Post, Body, HttpException, Delete, HttpStatus, UseFilters, UsePipes, UseGuards, UseInterceptors } from '@nestjs/common';

import { CreateCatDto } from './dto/cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { HttpExceptionFilter } from '../common/filters/httpException.filter';
import { ForbiddenException } from '../common/exceptions/forbidden.exception';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParseIntPipe } from '../common/pipes/parseInt.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())   // controller级别的filter拦截
// @UsePipes(new ValidationPipe())   // 数据校验
@UseInterceptors(LoggingInterceptor)
export class CatsController {

  constructor(private readonly catsService: CatsService) { };    // 将catSerivce加进来

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  // @UsePipes(new ValidationPipe())   // 数据校验
  async post( @Body() createCatDto: CreateCatDto): Promise<void> {
    this.catsService.create(createCatDto);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Delete()
  @UseFilters(new HttpExceptionFilter())
  async deleteOne() {
    throw new ForbiddenException();
    // throw new HttpException({
    //   error: 'This is a custom message',
    //   code: 10010,
    // }, HttpStatus.FORBIDDEN)
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id) : Promise<Cat>{
    return await this.catsService.findOne(id);
  }
}