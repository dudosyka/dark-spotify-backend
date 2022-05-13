import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../user/services/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "../../user/models/user.model";
import { RbacService } from "../../rbac/services/rbac.service";

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
    const rights = await this.rbacService.getRights(user.id);
    const refresh = this.jwtService.sign({ user: user.id, refresh: true }, { expiresIn: '30d' });
    const iat = this.jwtService.decode(refresh)['iat'];
    await this.userService.updateRefresh(user, iat)
    const token = this.jwtService.sign({ user: user.id, rules: rights }, { expiresIn: '45m' });
    return {
      token,
      refresh
    };
  }

  public async refresh(refresh: any) {
    console.log(refresh)
    if (!refresh.refresh) {
      throw new UnauthorizedException('Bad token');
    }
    const user = await this.userService.findOne({
      id: refresh.user
    }, [])
    if (user.refresh != refresh.iat) {
      throw new UnauthorizedException('Token expired');
    }
    return await this.login(user)
  }

  public async createUser(user: { login: string, password: string }): Promise<UserModel> | never {
    return await this.userService.reg(user);
  }

}
