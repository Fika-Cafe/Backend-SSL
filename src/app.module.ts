import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { EndpointsModule } from './endpoints/endpoints.module';
import { ServerModule } from './server/server.module';

@Module({
  imports: [UsersModule, PrismaModule, EndpointsModule, ServerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
