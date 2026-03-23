import { isValidCPF } from './cpf.validator';


describe('CPF Validator Utility', () => {
    it('deve retornar true para um CPF válido sem pontuação', () => {
        expect(isValidCPF('52998224725')).toBe(true);
    });

    it('deve retornar true para um CPF válido com pontuação', () => {
        expect(isValidCPF('529.982.247-25')).toBe(true);
    });

    it('deve retornar false para CPFs com dígitos incorretos', () => {
        expect(isValidCPF('529.982.247-26')).toBe(false);
    });

    it('deve retornar false para CPFs com tamanho inválido', () => {
        expect(isValidCPF('1234567890')).toBe(false);
        expect(isValidCPF('123456789012')).toBe(false);
    });

    it('deve retornar false para sequências repetidas', () => {
        expect(isValidCPF('111.111.111-11')).toBe(false);
        expect(isValidCPF('222.222.222-22')).toBe(false);
        expect(isValidCPF('333.333.333-33')).toBe(false);
        expect(isValidCPF('444.444.444-44')).toBe(false);
        expect(isValidCPF('555.555.555-55')).toBe(false);
        expect(isValidCPF('666.666.666-66')).toBe(false);
        expect(isValidCPF('777.777.777-77')).toBe(false);
        expect(isValidCPF('888.888.888-88')).toBe(false);
        expect(isValidCPF('999.999.999-99')).toBe(false);
        expect(isValidCPF('00000000000')).toBe(false);
    });

    it('deve retornar false para valores nulos, indefinidos ou tipos não-string', () => {
        expect(isValidCPF(null as any)).toBe(false);
        expect(isValidCPF(undefined as any)).toBe(false);
        expect(isValidCPF(12345678901 as any)).toBe(false);
        expect(isValidCPF('')).toBe(false);
    });
});