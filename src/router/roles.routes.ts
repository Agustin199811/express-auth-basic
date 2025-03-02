import { RequestHandler, Router } from "express";
import { createRole, findAllRole, softDeleteRole, updateRoles } from "../models/roles/roles.controller";
import { validateDTO } from "../common/middleware/validate-dto.middleware";
import { CreateRoleDto } from "../models/roles/dto/create-roles.dto";
import { authenticateJWT } from "../models/auth/middleware/auth.middleware";


const roleRouter = Router();

roleRouter.post("/roles", authenticateJWT,validateDTO(CreateRoleDto) as any, createRole as unknown as RequestHandler);
roleRouter.get("/roles", authenticateJWT, findAllRole as unknown as RequestHandler);
roleRouter.delete("/roles/:id",authenticateJWT, softDeleteRole as unknown as RequestHandler);
roleRouter.put("/roles/:id", authenticateJWT, validateDTO(CreateRoleDto) as any, updateRoles as unknown as RequestHandler);
export default roleRouter;