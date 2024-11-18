import { applyDecorators, UseGuards } from "@nestjs/common";
import { validRoles } from "../interfaces/validRoles.interface";
import { RoleProtected } from "./checkRole.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/userRole.guard";

export function Auth( ...roles: validRoles[] ) {
    return applyDecorators(
        RoleProtected( ...roles ),
        UseGuards( AuthGuard(), UserRoleGuard)
    )
}