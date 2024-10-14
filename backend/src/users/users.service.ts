import * as bcrypt from "bcrypt";

import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

import { CreateUserRequest } from "./dto/create-user.request";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(data: CreateUserRequest) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
        select: {
          email: true,
          id: true,
        },
      });
    } catch (err) {
      if (err.code === "P2002") {
        throw new UnprocessableEntityException("Email Already Exist!");
      }
      throw err;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
