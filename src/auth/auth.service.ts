import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, LoginDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthToken } from 'src/auth/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto): Promise<AuthToken> {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        passwordHash: hash,
      },
    });

    const token = await this.getToken(newUser.id, newUser.email);

    return {
      access_token: token,
    };
  }

  async login(dto: LoginDto): Promise<AuthToken> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Incorrect email or password');

    const passMatch = await argon2.verify(user.passwordHash, dto.password);

    if (!passMatch) throw new ForbiddenException('Incorrect email or password');

    const token = await this.getToken(user.id, user.email);

    return {
      access_token: token,
    };
  }

  hashData(data: string): Promise<string> {
    return argon2.hash(data, {
      type: argon2.argon2id,
    });
  }

  getToken(userId: string, email: string): Promise<string> {
    const token = this.jwtService.signAsync(
      { sub: userId, email },
      { secret: 'supersecret', expiresIn: '1h' },
    );
    return token;
  }
}
