import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { User } from "../../models/users/entity/users.entity";
import { Role } from "../../models/roles/entity/roles.entity";

dotenv.config();

export const TypeOrmConfig = new DataSource({
    type: process.env.DB_TYPE as any,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Role],
    synchronize: true,
});
