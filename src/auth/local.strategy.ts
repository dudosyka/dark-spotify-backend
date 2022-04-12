import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModel } from "../user/models/user.model";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserModel> {
    console.log(username, password)
    const user = await this.authService.validateUser({username, password});
    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
