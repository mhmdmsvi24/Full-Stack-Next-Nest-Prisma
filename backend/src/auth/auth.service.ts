import * as bcrypt from "bcrypt";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { TokenPayload } from "./token-payload.interface";
import { User } from "@prisma/client";
import { UsersService } from "src/users/users.service";
import ms from "ms";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jswService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(this.configService.getOrThrow<string>("JWT_EXPIRATION")),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const token = this.jswService.sign(tokenPayload);

    response.cookie("Authentication", token, {
      secure: true,
      httpOnly: true,
      expires,
    });

    return { tokenPayload };
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException("Credentials are Invalid");
    }
  }
}
