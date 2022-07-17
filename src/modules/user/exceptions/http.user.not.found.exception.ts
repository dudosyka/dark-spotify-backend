import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpUserNotFoundException extends HttpException {
  constructor(id: any) {
    super({
      status: HttpStatus.NOT_FOUND,
      error: `User ${id} not found`,
    }, HttpStatus.NOT_FOUND);
  }

}
