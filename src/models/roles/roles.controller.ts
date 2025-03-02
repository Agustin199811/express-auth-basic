import { Request, Response } from "express";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-roles.dto";
import { HttpException } from "../../common/utils/http.exception";


const rolesServices = new RolesService();

export const createRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roles = await rolesServices.createRole(req.body as CreateRoleDto)
        return res.status(201).json(roles);
    } catch (error) {
        if (error instanceof HttpException) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const findAllRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roles = await rolesServices.findByAllRole();
        return res.status(200).json(roles);
    } catch (error) {
        if (error instanceof HttpException) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const softDeleteRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const role = await rolesServices.softDeleteRole(req.params.id);
        return res.status(200).json({ deleteRole: role });
    } catch (error) {
        if (error instanceof HttpException) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateRoles = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roles = await rolesServices.updateRoles(req.params.id, req.body as Partial<CreateRoleDto>)
        return res.status(200).json(roles);
    } catch (error) {
        if (error instanceof HttpException) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}