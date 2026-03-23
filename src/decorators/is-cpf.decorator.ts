import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { isValidCPF } from '../utils/cpf.validator';

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
    validate(cpf: any, args: ValidationArguments) {
        return isValidCPF(cpf);
    }

    defaultMessage(args: ValidationArguments) {
        return 'O valor $value não é um CPF válido.';
    }
}

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCpfConstraint,
        });
    };
}