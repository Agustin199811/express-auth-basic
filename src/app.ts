import express from "express";
import { TypeOrmConfig } from "./common/config/database.config";
import logger from "./common/middleware/logger.middleware";
import router from "./router/routes";
import { RoleSeeder } from "./models/roles/seed/roles.seed";
import roleRouter from "./router/roles.routes";
import { UserSeeder } from "./models/users/seed/user.seed";
import authRouter from "./router/auth.routes";
//import router from "./router/users.routes";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api", router);
app.use("/api/v1", roleRouter);
app.use("/api/v1", authRouter);

TypeOrmConfig.initialize()
    .then(async () => {
        console.log('Database initialited');
        const roleSeeder = new RoleSeeder();
        await roleSeeder.seed();
        console.log('Roles seeded successfully');

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userSeeder = new UserSeeder();
        await userSeeder.seed();
        console.log('Users seeded successfully');

    })
    .catch((err) => {
        console.error('Error during initialization:', err);
        process.exit(1);
    });

export default app;