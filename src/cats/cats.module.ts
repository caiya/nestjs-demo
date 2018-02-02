import { Module } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsSchema } from './schemas/cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'cats', schema: CatsSchema }])],
  controllers: [CatsController],
  components: [CatsService],
  exports: [CatsService]    // 将CatsService导出，以便其它module可以import再次使用（永远不要导出controller）
})
export class CatsModule {
  // constructor(private readonly catsService: CatsService) {};   // 这里还可以这样引入
}
