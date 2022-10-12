import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateUser } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController 
{

    constructor(private userService: UsersService){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Admin)
    async findAll() {
        var response = await this.userService.findAll();
        return response;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('/:id')
    async findone(@Param('id') id: string) {        
        var response = await this.userService.findOne(id);
        return response;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/save')
    @Roles(Role.Admin)
    async save(@Body() user : CreateUser){
        const response = await this.userService.save(user, "admin");
        return {"userId": response};
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

}
