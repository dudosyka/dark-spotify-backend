import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('reg')
  async reg(@Request() req, @Body('user') user: { login: string, password: string }) {
    return this.authService.createUser(user)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    return await this.authService.refresh(req.user)
  }
}
