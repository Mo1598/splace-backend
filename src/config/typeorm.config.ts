import { TypeOrmModuleOptions } from "@nestjs/typeorm";
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    entities: [process.env.TYPEORM_ENTITIES]
    // entities: ['dist/**/*.entity{.ts,.js}'],
}