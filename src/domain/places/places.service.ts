import { PrismaService } from '@/infra/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaceDto, CreateSportsOnPlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(private readonly repository: PrismaService) {}

  async create(createPlaceDto: CreatePlaceDto, userId: string) {
    const user = await this.repository.user.findUnique({
      where: { id: userId },
    });

    const place = await this.repository.place.create({
      data: { ...createPlaceDto, user: { connect: { id: user.id } } },
    });

    return place;
  }

  async findAll() {
    return await this.repository.place.findMany();
  }

  async findOne(name: string) {
    const place = await this.repository.place.findUnique({
      where: { name },
    });

    if (!place) {
      throw new HttpException('Place not found', HttpStatus.BAD_REQUEST);
    }

    return place;
  }

  async update(name: string, updatePlaceDto: UpdatePlaceDto, userId: string) {
    const place = await this.repository.place.findUnique({
      where: { name },
    });

    if (!place) {
      throw new HttpException('Place not found', HttpStatus.BAD_REQUEST);
    }

    if (place.userId !== userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.repository.place.update({
      where: { name },
      data: updatePlaceDto,
    })
  }

  async remove(id: string, userId: string) {
    const place = await this.repository.place.findUnique({
      where: { id },
    });

    if (!place) {
      throw new HttpException('Place not found', HttpStatus.BAD_REQUEST);
    }

    if (place.userId !== userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    await this.repository.place.delete({
      where: { id },
    });

    return { message: 'Place deleted successfully' };
  }

  async addSportOnPlace(createSportsOnPlaceDto : CreateSportsOnPlaceDto){
    return await this.repository.sportsOnPlaces.create({
      data: {
        ...createSportsOnPlaceDto
      }
    })
  }

  async getSportOnPlaces(sportName: string){

    const sports =  await this.repository.sport.findMany({
      where : {
        name : sportName
      }
    })

    //todos os id de sports com mesmo nome
    if(sports.length == 0){
      throw new HttpException('Sport nao encontrado', HttpStatus.BAD_REQUEST);
    }

    const placesIds = []

    sports.forEach(e => this.repository.sportsOnPlaces.findUnique({
      where : {
        sportId : e.id
      }
    }))

    }

}
