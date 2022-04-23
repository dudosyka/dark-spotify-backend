import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SongModel } from "./song/models/song.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<SongModel[]> {
    return this.appService.getHello()
  }

}
