import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpNotFoundException extends HttpException {
  constructor(err: string) {
    super({
      status: HttpStatus.NOT_FOUND,
      error: err,
    }, HttpStatus.NOT_FOUND);
  }

}
