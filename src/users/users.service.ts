import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import * as bcrypt from 'bcrypt'

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

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const findUser = await this.prisma.user.findFirst({
        where: { email },
      });

      if (!findUser) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        throw new NotFoundException('Contraseña incorrecta');
      }

      return {
        message: 'Inicio de sesión exitoso',
        user: {
          id: findUser.id,
          email: findUser.email,
          name: findUser.name,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      // Para otros errores (conexión, base de datos, etc.)
      throw new InternalServerErrorException('Error inesperado al iniciar sesión');
    }
  }

  async createUser(createUserDto: CreateUserDto) {

    const { email, name, password } = createUserDto

    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { message: 'El usuario ya existe' }
    }

    // Validar que el email tenga un formato correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { message: 'El email no tiene un formato válido' }
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      return { message: 'La contraseña debe tener al menos 6 caracteres' }
    }

    // Hasear la contraseña
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    // Crear el usuario
    const createUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    if (!createUser) {
      return { message: 'Error al crear el usuario' }
    }

    return { message: 'Usuario creado correctamente', user: createUser }
  }
}
