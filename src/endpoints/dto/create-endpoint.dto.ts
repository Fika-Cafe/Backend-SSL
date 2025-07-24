import { IsString, IsNotEmpty, IsOptional, IsInt, IsUrl, IsEnum } from 'class-validator';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export class CreateEndpointDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string

  @IsUrl({}, { message: 'La URL debe ser una URL válida.' })
  @IsNotEmpty({ message: 'La URL es requerida' })
  url: string

  @IsNotEmpty({ message: 'Seleccione un metodo por favor' })
  @IsEnum(HttpMethod)
  method: string

  @IsInt({ message: 'El ID de usuario debe ser un número entero.' })
  @IsNotEmpty({ message: 'El ID de usuario es requerido' })
  userId: number

  @IsOptional()
  description?: string
}
