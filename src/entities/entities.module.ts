import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './roles.entity';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        User, Roles
    ])],
    exports: [TypeOrmModule],
})
export class EntitiesModule {}
