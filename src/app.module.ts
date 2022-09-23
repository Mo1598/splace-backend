import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from './entities/entities.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      typeOrmConfig
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),    
    EntitiesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
