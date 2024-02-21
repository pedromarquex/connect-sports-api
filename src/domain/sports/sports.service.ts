import { PrismaService } from '@/infra/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { retry } from 'rxjs';
import { register } from 'module';

@Injectable()
export class SportsService {
  constructor(private readonly repository: PrismaService) {}

  async create(createSportDto: CreateSportDto, userId: string) {
    // const sportAlreadyExist = await this.repository.sport.findUnique({
    //   where: { name: createSportDto.name }
    // });

    console.log('user Id no service create sports',userId)

    const userAlreadyExists = await this.repository.user.findUnique({
      where : {id : userId}
    })

    // if(sportAlreadyExist){
    //   throw new HttpException('Esse esporte já existe', HttpStatus.BAD_REQUEST);
    // }

    console.log(userAlreadyExists)

    if(!userAlreadyExists){
      throw new HttpException('Usuario nao encontrado', HttpStatus.NOT_FOUND);
    }

    const sport = await this.repository.sport.create({
      data: {
        ...createSportDto
      },
    });

    //reponsavel por manter o relacionamento entra sport e user
    const sportsOnUsers = await this.repository.sportsOnUsers.create({
      data : {
        userId,
        sportId: sport.id
      }
    })

    console.log('sportsOnUsers',sportsOnUsers)

    return {sport, sportsOnUsers};
  }


  async findAll() {
    return await this.repository.sport.findMany();
  }


  async findOne(id: string) {
    const sport = await this.repository.sport.findUnique({
      where: { id },
    });
      
    if (!sport) {
      throw new HttpException('Sport not found', HttpStatus.BAD_REQUEST);
    }

    return sport;
  }

  async update(id: string, updateSportDto: UpdateSportDto, userId: string) {
    const sport = await this.repository.sport.findUnique({
      where: { id },
    });

    if (!sport) {
      throw new HttpException('Sport not found', HttpStatus.BAD_REQUEST);
    }

    return this.repository.sport.update({
      where: { id },
      data: {
        ...updateSportDto,
        updatedAt: new Date()
      }

    });
  }

  //teria que remover o sport do place e nao remover o sport completo
  async remove(id: string, userId: string) {
    const sport = await this.repository.sport.findUnique({
      where: { id },
    });

    if (!sport) {
      throw new HttpException('Sport not found', HttpStatus.BAD_REQUEST);
    }

    await this.repository.sport.update({
      where: { id },
      data : {
        statusActive : false,
        updatedAt: new Date()
      }
    });

    return { message: 'Sport deleted successfully' };
  }

  async removeUser(id: string, userId : string){
    const sport = await this.repository.sport.findUnique({
      where: { id },
    });

    if (!sport) {
      throw new HttpException('Sport not found', HttpStatus.BAD_REQUEST);
    }

    //verificar se o usuario existe  -> pendente

    const register = await this.repository.sportsOnUsers.updateMany({
      where :{
        userId,
        sportId : sport.id
      },
      data :{
        assingnedAt : new Date(),
        statusActive : false
      }
    })

    return register
  }

  async addUsers(id: string, userId : string){
    const sport = await this.repository.sport.findUnique({
      where: { id },
    });

    if (!sport) {
      throw new HttpException('Sport not found', HttpStatus.BAD_REQUEST);
    }

    //verificar se o usuario existe  -> pendente

    const register = await this.repository.sportsOnUsers.create({
      data :{
        userId,
        sportId : sport.id
      }
    })

    return register
  }

  async findSportsOnUser(id : string) {
    console.log('Em findSportsOnUser')
    const user = await this.repository.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const registers =  await this.repository.sportsOnUsers.findMany({
      where: {
        userId : id
      }
    })

    console.log("REGISTERS",registers)

    const promises = registers.map(e => this.repository.sport.findUnique({
      where : {
        id : e.sportId
      }
    }))

    const usersOnSport = []

    await Promise.all(promises)
      .then((e) => {
        console.log("USER",e)
        usersOnSport.push(e)
      } )

    return usersOnSport
  }

  async findUsersOnSport(name : string) {
    console.log('em findUsersOnSport')
    const sports = await this.repository.sport.findMany({
      where: { name },
    });

    if (sports.length == 0) {
      throw new HttpException('Sport not found', HttpStatus.BAD_REQUEST);
    }

    console.log("SPORTS",sports)

    const registers_promises = []

    sports.forEach(e => {
        registers_promises.push(
        this.repository.sportsOnUsers.findMany({
          where: {
            sportId : e.id
          }
        })
      ) 
    })

    const registers = []
    
    Promise.all(registers_promises)
      .then(e => {
        registers.push(e)
      })
    

    console.log("REGISTERS",registers)

    const promises = registers.map(e => this.repository.user.findUnique({
      where : {
        id : e.userId
      }
    }))

    const usersOnSport = []

    await Promise.all(promises)
      .then((e) => {
        console.log("USER",e)
        usersOnSport.push(e)
      } )

    return usersOnSport
  }


}
