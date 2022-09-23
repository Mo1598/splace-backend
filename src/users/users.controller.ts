import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { CreateUser } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController 
{

    constructor(private userService: UsersService){}

    @Get('/all')
    async findAll() {
        var response = await this.userService.findAll();
        return response;
    }

    @Get('/find')
    async findone(@Param('id') id: number) {
        var response = await this.userService.findOne(id);
        return response;
    }

    @Post('/save')
    async save(@Body() user : CreateUser){
        console.log(user);
        const response = await this.userService.save(user);
    }

}
