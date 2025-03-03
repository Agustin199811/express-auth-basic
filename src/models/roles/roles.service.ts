import { IsNull, Not, Repository } from "typeorm";
import { Role } from "./entity/roles.entity";
import { TypeOrmConfig } from "../../common/config/database.config";
import { CreateRoleDto } from "./dto/create-roles.dto";
import { Response } from "express";
import { HttpException } from "../../common/utils/http.exception";


export class RolesService {
    private readonly roleRepository: Repository<Role>;
    constructor() {
        this.roleRepository = TypeOrmConfig.getRepository(Role);
    }

    public async createRole(createDto: CreateRoleDto): Promise<Role> {
        const role = await this.roleRepository.findOneBy({ name: createDto.name });
        if (role) {
            throw new HttpException(400, 'Role already exists');
        }
        const roles = this.roleRepository.create(createDto);

        return await this.roleRepository.save(roles);
    }

    public async findRoleOneByName(name: string): Promise<Role | null> {
        const role = await this.roleRepository.findOneBy({ name });
        return role;
    }

    public async findByAllRole(): Promise<Role[]> {
        const roles = await this.roleRepository.find({
            where: {
                deleteAt: IsNull()
            }
        });
        return roles;
    }

    public async updateRoles(id: string, updateDtoRoles: Partial<CreateRoleDto>): Promise<Role> {
        const { ...updateData } = updateDtoRoles;
        const role = await this.roleRepository.findOneBy({ id });
        if (!role) {
            throw new HttpException(400, "Role not foud");
        }
        Object.assign(role, updateData);
        return await this.roleRepository.save(role);

    }

    public async softDeleteRole(id: string): Promise<Role> {
        const role = await this.roleRepository.findOneBy({ id });
        if (!role) {
            throw new HttpException(400, "Role not foud");
        }
        role.deleteAt = new Date();
        return await this.roleRepository.save(role);
    }

    public async restoreRole(id: string): Promise<Role> {
        const role = await this.roleRepository.findOne({
            where: { id },
            withDeleted: true,
        });

        if (!role) {
            throw new HttpException(400, "User not found");
        }
        role.deleteAt = null; 
        return await this.roleRepository.save(role);
    }

}