import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateEndpointDto } from './dto/create-endpoint.dto'

@Injectable()
export class EndpointsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEndpoints() {
    const getAllEndpoints = await this.prisma.endpoint.findMany()

    if (!getAllEndpoints || getAllEndpoints.length === 0) {
      return { message: 'No hay endpoints disponibles' }
    }

    return getAllEndpoints
  }

  async getEndpointById(id: number) {

    const idNumber = Number(id)

    const endpoints = await this.prisma.endpoint.findMany({
      where: {
        userId: idNumber,
      },
    })

    if (!endpoints) {
      throw new NotFoundException(`No se encontraron endpoints para el usuario con ID ${id}`)
    }

    return endpoints
  }

  async createEndpoint(createEndpointDto: CreateEndpointDto)
  {
    const { name, description, url, method, userId } = createEndpointDto

    const userID = Number(userId)

    const newEndpoint = await this.prisma.endpoint.create({
      data: {
        name,
        method,
        description,
        url,
        userId: userID,
      },
    })

    if (!newEndpoint) {
      throw new NotFoundException('Error al crear el endpoint')
    }

    return newEndpoint
  }
}
