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
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswordsConstraint, {
    message: 'Las contraseñas no coinciden.',
  })
  confirmPassword: string
}
