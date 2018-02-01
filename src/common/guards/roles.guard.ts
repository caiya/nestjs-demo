import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';

import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { };
    
    canActivate(req, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { parent, handler } = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if (!roles) {
            return true;
        }
        const user = req.user;
        // user.roles: ['admin', 'test', 'operator']
        // roles: ['admin']
        const hasRole = () => !!user.roles.find(role => !!roles.find(item => item === role));
        return user && user.roles && hasRole();
    }
}