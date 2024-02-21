import { Sport as SportModel } from '.prisma/client';
import { AuthGuard } from '@/domain/users/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createSportDto: CreateSportDto,
    @Request() request: Request,
  ) {
    console.log("no controller de sports",request['userId'])
    return this.sportsService.create(createSportDto, request['userId']);
    
  }

  @Get()
  findAll() {
    return this.sportsService.findAll();
  }

  //retorna todos os sports de um user
  @UseGuards(AuthGuard)
  @Get('user')
  getAllSportsOnSports(@Request() request : Request){
    console.log("Get->/sports/user")
    return this.sportsService.findSportsOnUser(request['userId'])
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSportDto: UpdateSportDto,
    @Request() request: Request,
  ) {
    return this.sportsService.update(id, updateSportDto, request['userId']);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() request: Request) {
    return this.sportsService.remove(id, request['userId']);
  }

  //desativa a relacao de um userId e sport
  @UseGuards(AuthGuard)
  @Post('removeUser')
  removeUsers(
    @Body() id : string,
    @Request() request : Request,
  ) {
    return this.sportsService.removeUser(id,request['userId']);
  }

  //retornar todos os users de um sport
  @Get(':name/users')
  getAllUsersOnSport(@Param('name') name: string) {
    return this.sportsService.findUsersOnSport(name);
  }

  
  //cria uma relacao entre user e sport
  @UseGuards(AuthGuard)
  @Post('addUser')
  addUsers(
    @Body() id : string,
    @Request() request : Request,
  ) {
    return this.sportsService.addUsers(id,request['userId']);
  }
}
