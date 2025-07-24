import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'MatchPasswords', async: false })
export class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: any, args: ValidationArguments) {
    const object = args.object as any
    return object.password === confirmPassword
  }

  defaultMessage(args: ValidationArguments) {
    return 'Las contraseñas no coinciden.'
  }
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string

  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  password: string

  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswordsConstraint, {
    message: 'Las contraseñas no coinciden.',
  })
  confirmPassword: string
}
