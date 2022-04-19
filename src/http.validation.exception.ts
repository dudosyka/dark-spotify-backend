import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpValidationException extends HttpException {
  constructor(validate) {
    super({
      status: HttpStatus.BAD_REQUEST,
      error: JSON.stringify(validate)
    }, HttpStatus.BAD_REQUEST);
  }
}
