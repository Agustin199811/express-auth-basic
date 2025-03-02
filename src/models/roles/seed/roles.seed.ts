import { Repository } from "typeorm";
import { Role } from "../entity/roles.entity";
import { TypeOrmConfig } from "../../../common/config/database.config";
import { RoleEnum } from "../enum/roles.enum";

export class RoleSeeder {
    private readonly roleRepository: Repository<Role>;
    constructor() {
        this.roleRepository = TypeOrmConfig.getRepository(Role);
    }

    public async seed(): Promise<void> {

        const roles = Object.values(RoleEnum);
        for (const role of roles) {
            const existingRole = await this.roleRepository.findOneBy({ name: role });
            if (!existingRole) {
                const newRole = this.roleRepository.create({ name: role });
                this.roleRepository.save(newRole);
                console.log(`Role ${role} created successfully`);
            }
        }
    }
}