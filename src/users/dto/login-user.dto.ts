import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string

  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  password: string
}