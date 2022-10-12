import { SetMetadata } from "@nestjs/common";
import Permissions from "src/enums/permissions/permission.type";

export const ROLES_KEY = 'roles';
export const Permission = (...permissions: Permissions[]) => SetMetadata(ROLES_KEY, permissions);