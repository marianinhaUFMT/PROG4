import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'zeldinha_secret_2026_marianinha123',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    if (!payload) throw new UnauthorizedException();
    return { id: payload.sub, email: payload.email };
    // o que for retornado aqui fica disponível como req.user nos controllers
  }
}