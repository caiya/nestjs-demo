import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import { Photo } from "./photos.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Component()
export class PhotoService {

  constructor(
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>
  ) {};

  async findAll(): Promise<Photo[]> {
    return await this.photosRepository.find();
  }
  
}