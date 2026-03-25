import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    maxLength,
} from 'class-validator';
import { isValidCPF } from '../utils/cpf.validator';

export interface IsCpfValidationOptions extends ValidationOptions {
    message?: string;
    maxLength?: number;
}

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
    validate(cpf: any, args: ValidationArguments) {
        const [maxLength] = args.constraints;
        if (typeof cpf === 'string' && maxLength !== undefined && cpf.length > maxLength) {
            return false;
        }
        return isValidCPF(cpf);
    }

    defaultMessage(args: ValidationArguments) {
        return 'O valor $value não é um CPF válido.';
    }
}

export function IsCPF(validationOptions?: IsCpfValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [validationOptions?.maxLength],
            validator: IsCpfConstraint,
        });
    };
}