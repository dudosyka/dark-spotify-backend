import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from './auth.controller';
import { RbacModule } from "../rbac/rbac.module";
import { RbacService } from "../rbac/rbac.service";

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
