import { validateSync } from 'class-validator';
import { IsCPF } from './is-cpf.decorator';

class TestCpfDto {
    @IsCPF()
    cpf: string;
    constructor(cpf: string) {
        this.cpf = cpf;
    }
}

describe('IsCPF Decorator', () => {
    it('não deve retornar erros quando o CPF for válido', () => {
        const dto = new TestCpfDto('529.982.247-25');
        const dto2 = new TestCpfDto('52998224725');
        const errors = validateSync(dto);
        const errors2 = validateSync(dto2);

        expect(errors.length).toBe(0);
        expect(errors2.length).toBe(0);
    });

    it('deve retornar um erro de validação quando o CPF for inválido', () => {
        const dto = new TestCpfDto('123.456.789-00');
        const errors = validateSync(dto);

        expect(errors.length).toBe(1);
        expect(errors[0].property).toBe('cpf');
        expect(errors[0].constraints).toHaveProperty('IsCpfConstraint');
    });

    it('deve utilizar a mensagem de erro padrão', () => {
        const dto = new TestCpfDto('11111111111');
        const errors = validateSync(dto);

        expect(errors[0].constraints?.IsCpfConstraint).toBe('O valor 11111111111 não é um CPF válido.');
    });
});