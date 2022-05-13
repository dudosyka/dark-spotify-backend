import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from "../user/user.module";
import { UserService } from "../user/services/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../../conf/constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from './controllers/auth.controller';
import { RbacModule } from "../rbac/rbac.module";
import { RbacService } from "../rbac/services/rbac.service";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    RbacModule
  ],
  providers: [AuthService, UserService, JwtStrategy, LocalStrategy, RbacService],
  exports: [AuthModule],
  controllers: [AuthController]
})
export class AuthModule {}
