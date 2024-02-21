import { Place as PlaceModel } from '.prisma/client';
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
import { CreatePlaceDto,CreateSportsOnPlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createPlaceDto: CreatePlaceDto,
    @Request() request: Request,
  ): Promise<PlaceModel> {
    return this.placesService.create(createPlaceDto, request['userId']);
  }

  //obter todas os lugares de um sport
  @Get(':sportName')
  getSportOnPlaces(@Param() params :any){
    // return this.placesService.getSportsOnPlace(params.sportName)
  }

  //obter todos os sports de um lugar

  @Get()
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.placesService.findOne(name);
  }

  @UseGuards(AuthGuard)
  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
    @Request() request: Request,
  ) {
    return this.placesService.update(name, updatePlaceDto, request['userId']); //atualizar um place com um nome ja existente gera error
  }

  @UseGuards(AuthGuard)
  @Delete(':name')
  remove(@Param('name') name: string, @Request() request: Request) {
    return this.placesService.remove(name, request['userId']);
  }
  

  @Post('addSport')
  addSportOnPlace(@Body() createSportsOnPlaceDto :CreateSportsOnPlaceDto){
    return this.placesService.addSportOnPlace(createSportsOnPlaceDto)
  }

}
