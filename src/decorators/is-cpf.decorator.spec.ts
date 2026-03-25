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

    describe('com opções (maxLength)', () => {
        class TestCpfMaxLengthDto {
            @IsCPF({ maxLength: 14 })
            cpf: string;
            constructor(cpf: string) {
                this.cpf = cpf;
            }
        }

        it('deve invalidar CPF correto quando passar do tamanho máximo permitido, como com traços e pontos excessivos', () => {
            const dto = new TestCpfMaxLengthDto('529.....982....247-25');
            const errors = validateSync(dto);

            expect(errors.length).toBe(1);
            expect(errors[0].constraints?.IsCpfConstraint).toBe('O valor 529.....982....247-25 não é um CPF válido.');
        });

        it('não deve invalidar quando o CPF possui tamanho menor ou igual ao permitido', () => {
            const dtoValidoSemPontos = new TestCpfMaxLengthDto('52998224725');
            const dtoValidoComPontos = new TestCpfMaxLengthDto('529.982.247-25');
            
            const err1 = validateSync(dtoValidoSemPontos);
            const err2 = validateSync(dtoValidoComPontos);

            expect(err1.length).toBe(0);
            expect(err2.length).toBe(0);
        });
    });

    describe('com opções (message personalizada)', () => {
        class TestCpfCustomMessageDto {
            @IsCPF({ message: 'CPF inválido, testes automatizados.' })
            cpf: string;
            constructor(cpf: string) {
                this.cpf = cpf;
            }
        }

        it('deve utilizar a mensagem de erro personalizada', () => {
            const dto = new TestCpfCustomMessageDto('11111111111');
            const errors = validateSync(dto);

            expect(errors[0].constraints?.IsCpfConstraint).toBe('CPF inválido, testes automatizados.');
        });
    });
});