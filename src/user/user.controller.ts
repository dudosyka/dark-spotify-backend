import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { RbacService } from "../rbac/rbac.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
export class UserController {
  constructor(private rbacService: RbacService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  public async index(@Request() req) {
    return this.rbacService.getRights(req.user)
  }
}
