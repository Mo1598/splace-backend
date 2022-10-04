import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateUser } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController 
{

    constructor(private userService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    @Roles(Role.User)
    async findAll() {
        var response = await this.userService.findAll();
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findone(@Param('id') id: string) {        
        var response = await this.userService.findOne(id);
        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Post('/save')
    @Roles(Role.Admin)
    async save(@Body() user : CreateUser){
        const response = await this.userService.save(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }

}
