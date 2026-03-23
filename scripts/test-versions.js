// scripts/test-versions.js
const { execSync } = require('child_process');

// Defina as versões críticas do class-validator suportadas pelo ecossistema NestJS
const versions = ['0.13.2', '0.14.4', '0.15.1'];
const peerDependency = 'class-validator';

console.log(`\nIniciando testes para ${peerDependency}...\n`);

let hasFailure = false;

for (const version of versions) {
    console.log(` Testando compatibilidade: ${peerDependency}@${version}`);

    try {
        // 1. Limpa o cache do Jest para evitar falsos positivos entre mudanças de dependência
        execSync('npx jest --clearCache', { stdio: 'ignore' });

        // 2. Instala a versão específica sem alterar o package.json (--no-save)
        execSync(`npm install ${peerDependency}@${version} --no-save`, { stdio: 'inherit' });

        // 3. Executa a suíte de testes unitários e de integração
        execSync('npm run test', { stdio: 'inherit' });

        console.log(`\n[ OK ] Testes passaram com ${peerDependency}@${version}\n`);
    } catch (error) {
        console.error(`\n[ ERRO ] Falha ao testar com ${peerDependency}@${version}\n`);
        hasFailure = true;
    }
}

// 4. Restauração do estado original
console.log(`Restaurando o ambiente de dependências original...`);
execSync('npm ci', { stdio: 'inherit' });

if (hasFailure) {
    console.error(`\nProcesso falhou.`);
    process.exit(1);
} else {
    console.log(`\nProcesso finalizado com sucesso.`);
    process.exit(0);
}