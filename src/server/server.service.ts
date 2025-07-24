import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerService {

  startServer() {
    return { message: 'Servidor iniciado correctamente'}
  }
}
