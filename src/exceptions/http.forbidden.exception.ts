import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpForbiddenException extends HttpException {
  constructor(error: string) {
    super({
      status: HttpStatus.FORBIDDEN,
      error
    }, HttpStatus.FORBIDDEN);
  }

}
