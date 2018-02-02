import {Component} from '@nestjs/common';
import {Cat} from './interfaces/cats.interface';

import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CatsSchema } from './schemas/cat.schema';
import { CreateCatDto } from './dto/cats.dto';

@Component()
export class CatsService {

  constructor(
    @InjectModel(CatsSchema)
    private readonly catsModel: Model<Cat>
  ) {};

  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Cat {
    // this.cats.push(cat);
    const createCat = new this.catsModel(createCatDto);
    return createCat.save();
  }

  findAll(): Cat[]{
    return this.catsModel.find().exec();
    // return this.cats;
  }

  findOne(id: string): Cat {
    return this.catsModel.findOne({_id: id}).exec();
  }

  deleteOne(id: string) {
    return this.catsModel.deleteOne({_id: id}).exec();
  }
}