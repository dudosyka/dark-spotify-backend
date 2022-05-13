import { HttpException, HttpStatus } from "@nestjs/common";

export class HttpUserNotFoundException extends HttpException {
  constructor(id: number) {
    super({
      status: HttpStatus.NOT_FOUND,
      error: `User with id: ${id} not found`,
    }, HttpStatus.NOT_FOUND);
  }

}
