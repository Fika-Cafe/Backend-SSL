import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { EndpointsModule } from './endpoints/endpoints.module';

@Module({
  imports: [UsersModule, PrismaModule, EndpointsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
