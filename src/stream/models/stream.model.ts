import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'
import { StreamOnPlay } from "../create.stream.dto";

export type StreamDocument = Stream & Document;

@Schema()
export class Stream {
  @Prop({
    type: Number
  })
  id: number

  @Prop({
    type: Number
  })
  userId: number

  @Prop({
    type: Number
  })
  onPlay: StreamOnPlay

  @Prop({
    type: [Number]
  })
  playList: number[]

  @Prop()
  album: number
}

export const StreamSchema = SchemaFactory.createForClass(Stream);