import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
const prisma = new PrismaClient();
async function main() {
    const futebol = prisma.sport.upsert({
        where: { id : crypto.randomUUID()},
        update: {},
        create: {
            name: 'futebol',
            description: 'Jogo competitivo entre 2 times com 11 jogadores cada. O objetivo é fazer a bola atravessar o gol do time adversario',
        }
    })

    console.log({futebol})

}
main()
    .then( async ()=>{
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })