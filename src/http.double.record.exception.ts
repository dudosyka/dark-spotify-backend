import { HttpException } from "@nestjs/common";

export class HttpDoubleRecordException extends  HttpException {
  constructor(doubledRecord) {
    super({
      status: 409,
      error: doubledRecord
    }, 409);
  }
}
