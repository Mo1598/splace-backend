import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import Permissions from "src/enums/permissions/permission.type";
import { JwtAuthGuard } from "./jwt-auth.guard";
export const PermissionGuard = (permission: Permissions): Type<CanActivate> =>{
    class PermissionGuardMixin extends JwtAuthGuard {
        async canActivate(context: ExecutionContext){
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            return user?.permissions.includes(permission);
        }
    }
    return mixin(PermissionGuardMixin);
}
