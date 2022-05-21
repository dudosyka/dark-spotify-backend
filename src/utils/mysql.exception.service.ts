import { HttpDoubleRecordException } from "../exceptions/http.double.record.exception";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class MysqlExceptionService {
  constructor() {}

  public throw(err): never {
    if (err.name === "SequelizeForeignKeyConstraintError")
      throw new NotFoundException();

    if (err.name === "SequelizeUniqueConstraintError")
      throw new HttpDoubleRecordException("")

    throw new BadRequestException();
  }
}
