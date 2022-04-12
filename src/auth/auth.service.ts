import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "../user/models/user.model";
import { RbacService } from "../rbac/rbac.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private rbacService: RbacService
  ) {}

  public async validateUser(credentials: {username: string, password: string}): Promise<UserModel> {
    const user = await this.userService.findOne({
      login: credentials.username
    }, []);
    if (await this.userService.comparePassword(user, credentials.password)) {
      return user;
    }
    return null;
  }

  public async login(user: UserModel): Promise<{ token: string, refresh: string }> {
    const rights = await this.rbacService.getRights(user.id)
    const refresh = this.jwtService.sign({ user: user.id, refresh: true }, { expiresIn: '30d' })
    const token = this.jwtService.sign({ user: user.id, rules: rights }, { expiresIn: '15m' })
    return {
      token,
      refresh
    };
  }

  public async refresh(refresh: any) {
    if (!refresh.refresh) {
      throw new UnauthorizedException('Bad token')
    }
    return await this.login(await this.userService.findOne({
      id: refresh.user
    }, []))
  }

}
