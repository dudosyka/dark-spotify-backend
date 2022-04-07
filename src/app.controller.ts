import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `
    <audio controls>
      <source src="http://localhost:3000/music-controller/pcp" type="audio/mp3">
      Your browser does not support the audio tag.
    </audio>`
  }

}
