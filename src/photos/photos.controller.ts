import { Controller, Get } from "@nestjs/common";
import { Photo } from "./photos.entity";
import { PhotoService } from "./photos.service";

@Controller('photos')
export class PhotosController {

  constructor(private readonly photoService: PhotoService) { };    // 将catSerivce加进来

  @Get()
  async findAll(): Promise<Photo[]> {
    return await this.photoService.findAll()
  }

}