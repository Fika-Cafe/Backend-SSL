import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global() // hace disponible este módulo globalmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
