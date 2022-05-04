import { Body, Controller, Get, Param, Req, StreamableFile } from "@nestjs/common";
import { StreamService } from "./stream.service";
import { UpdateStreamDto } from "./update.stream.dto";
import { OutputStreamDto } from "./output.stream.dto";

@Controller('stream')
export class StreamController {
  constructor(private streamService: StreamService) {}

  @Get(':id')
  async start(@Req() req, @Param('id') stream_id: string): Promise<StreamableFile> {
    return new StreamableFile(await this.streamService.getOnPlay(stream_id));
  }

  @Get(':id/next')
  async next(@Param('id') stream_id: string): Promise<StreamableFile> {
    return new StreamableFile(await this.streamService.next(stream_id));
  }

  @Get(':id/info')
  async info(@Param('id') stream_id: string): Promise<OutputStreamDto> {
    return await this.streamService.info(stream_id);
  }

  @Get(':id/update')
  async update(@Param(':id') stream_id: string, @Body('data') data: UpdateStreamDto) {
    return await this.streamService.append(stream_id, data);
  }

  @Get(':id/stop')
  async stop(@Param('id') stream_id: number) {

  }
}
