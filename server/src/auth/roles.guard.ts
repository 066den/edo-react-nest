import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      try {
        const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())
        
        if(!requiredRoles) {
          return true;
        }
        
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        if(bearer !== 'Bearer' || !token) {
          throw new UnauthorizedException({message: 'Користувач не авторизований'})
        }

        const user = this.jwtService.verify(token);
        req.user = user;
        //console.log(requiredRoles)
        return requiredRoles.some(role => role.includes(user.role.value));
      
      } catch (e) {
        throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN);
      }
  }
}