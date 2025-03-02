import { RequestHandler, Router } from "express";
import { createRole, findAllRole, softDeleteRole, updateRoles } from "../models/roles/roles.controller";
import { validateDTO } from "../common/middleware/validate-dto.middleware";
import { CreateRoleDto } from "../models/roles/dto/create-roles.dto";


const roleRouter = Router();

roleRouter.post("/roles", validateDTO(CreateRoleDto) as any, createRole as unknown as RequestHandler);
roleRouter.get("/roles", findAllRole as unknown as RequestHandler);
roleRouter.delete("/roles/:id", softDeleteRole as unknown as RequestHandler);
roleRouter.put("/roles/:id", validateDTO(CreateRoleDto) as any, updateRoles as unknown as RequestHandler);
export default roleRouter;