import { PipeTransform, ArgumentMetadata, Pipe, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {

  // value: the current processed parameter
  // metadata: the current processed parameter's metadata
  async transform(value, metadata: ArgumentMetadata) {
    console.log('metadata:', metadata);
    console.log('value:', value);
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);   // 将原始的js对象转换为js的Class实例
    const errors = await validate(object);    // 校验实例
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}

