import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany()

    if (!users || users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios')
    }

    return users
  }

  async createUser(createUserDto: CreateUserDto) {

    const { email, name, password } = createUserDto

    const createUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    })

    if (!createUser) {
      return { message: 'Error al crear el usuario' }
    }

    return { message: 'Usuario creado correctamente', user: createUser }
  }
}
