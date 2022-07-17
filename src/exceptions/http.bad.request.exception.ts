import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpBadRequestException extends HttpException {
  constructor(error: string) {
    super({
      status: HttpStatus.BAD_REQUEST,
      error
    }, HttpStatus.BAD_REQUEST);
  }

}
