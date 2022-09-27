import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@ApiTags('main')
@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return Date();
  }

  @UseGuards(AuthGuard( 'local' ))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
