import {ExtractJwt,Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport'
import { Injectable } from "@nestjs/common";
import conf from '..';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:conf.jwt.secretKey
        })
    }
    // JWT验证-step 4：被守卫调用
    async validate(user:any){
        console.log(`JWT验证-step 4:被守卫调用`);
        return user
    }
}