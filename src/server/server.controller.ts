import { Controller, Get } from '@nestjs/common';
import { ServerService } from './server.service';

@Controller('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

    @Get("/alive")
    startServer() {
      return this.serverService.startServer();
  }
}
