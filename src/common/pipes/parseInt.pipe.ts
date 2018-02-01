import { PipeTransform, ArgumentMetadata, Pipe, BadRequestException } from '@nestjs/common';

@Pipe()
export class ParseIntPipe implements PipeTransform<string> {

  // value: the current processed parameter
  // metadata: the current processed parameter's metadata
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

