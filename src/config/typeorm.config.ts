import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'splace',
    password: 'splacebackend',
    database: 'splace',
    synchronize: true,
    keepConnectionAlive: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
}