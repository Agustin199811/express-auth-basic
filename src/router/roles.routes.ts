import { RequestHandler, Router } from "express";
import { createRole, findAllRole, restoreRole, softDeleteRole, updateRoles } from "../models/roles/roles.controller";
import { validateDTO } from "../common/middleware/validate-dto.middleware";
import { CreateRoleDto } from "../models/roles/dto/create-roles.dto";
import { authenticateJWT } from "../models/auth/middleware/auth.middleware";
import { authorizeRoles } from "../models/auth/middleware/roles.middeware";


const roleRouter = Router();

roleRouter.post("/roles", authenticateJWT, authorizeRoles('admin') as any, validateDTO(CreateRoleDto) as any, createRole as unknown as RequestHandler);
roleRouter.get("/roles", authenticateJWT, authorizeRoles('admin') as any, findAllRole as unknown as RequestHandler);
roleRouter.delete("/roles/:id", authenticateJWT, authorizeRoles('admin') as any, softDeleteRole as unknown as RequestHandler);
roleRouter.put("/roles/restore/:id", authenticateJWT, authorizeRoles('admin') as any, restoreRole as unknown as RequestHandler);
roleRouter.put("/roles/:id", authenticateJWT, authorizeRoles('admin') as any, validateDTO(CreateRoleDto) as any, updateRoles as unknown as RequestHandler);
export default roleRouter;