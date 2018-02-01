import {Component} from '@nestjs/common';
import {Cat} from './interfaces/cats.interface';

@Component()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): void {
    this.cats.push(cat);
  }

  findAll(): Cat[]{
    return this.cats;
  }

  findOne(id: number): Cat {
    return this.cats.find(cat => cat.id === id);
  }
}