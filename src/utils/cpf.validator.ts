export function isValidCPF(cpf: any): boolean {
    if (!cpf) return false;
    cpf = String(cpf);

    const cleanCpf = cpf.replace(/[^\d]+/g, '');

    if (cleanCpf.length !== 11 || !!cleanCpf.match(/(\d)\1{10}/)) {
        return false;
    }

    const digits = cleanCpf.split('').map(Number);

    const calculateDigit = (count: number): number => {
        const sum = digits
            .slice(0, count - 12)
            .reduce((acc: number, digit: number, index: number) => acc + digit * (count - index), 0);
        const rest = (sum * 10) % 11;
        return rest === 10 || rest === 11 ? 0 : rest;
    };


    return calculateDigit(10) === digits[9] && calculateDigit(11) === digits[10];
}