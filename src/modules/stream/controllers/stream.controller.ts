import { Body, Controller, Get, Param, Post, Req, StreamableFile } from "@nestjs/common";
import { StreamService } from "../services/stream.service";
import { UpdateStreamDto } from "../dtos/update.stream.dto";
import { OutputStreamDto } from "../dtos/output.stream.dto";

@Controller('stream')
export class StreamController {
  constructor(private streamService: StreamService) {}

  @Get(':id')
  async start(@Req() req, @Param('id') stream_id: string): Promise<StreamableFile> | never {
    return new StreamableFile(await this.streamService.getOnPlay(stream_id));
  }

  @Post(':id/next')
  async next(@Param('id') stream_id: string): Promise<StreamableFile> | never {
    return new StreamableFile(await this.streamService.next(stream_id));
  }

  @Post(':id/prev')
  async prev(@Param('id') stream_id: string): Promise<StreamableFile> | never {
    return new StreamableFile(await this.streamService.prev(stream_id));
  }

  @Get(':id/info')
  async info(@Param('id') stream_id: string): Promise<OutputStreamDto> | never {
    return await this.streamService.info(stream_id);
  }

  @Post(':id/update')
  async update(@Param('id') stream_id: string, @Body('data') data: UpdateStreamDto) {
    return await this.streamService.append(stream_id, data);
  }

  @Post(':id/stop')
  async stop(@Param('id') stream_id: number) {

  }
}
