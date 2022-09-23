import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EntitiesModule } from 'src/entities/entities.module';

@Module({
    imports: [EntitiesModule],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
