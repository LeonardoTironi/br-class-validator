# br-class-validator

[![npm version](https://img.shields.io/npm/v/br-class-validator.svg)](https://www.npmjs.com/package/br-class-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

Uma biblioteca de validação para dados do Brasil desenvolvida para integrar com o [class-validator](https://github.com/typestack/class-validator).

## Instalação

Você pode instalar o pacote via npm, yarn ou pnpm:

```bash
npm install br-class-validator
# ou
yarn add br-class-validator
# ou
pnpm add br-class-validator
```

> **Nota:** O `class-validator` é uma _peer dependency_ necessária para o funcionamento desta biblioteca. Versões compatíveis: `^0.13.0`, `^0.14.0`, ou `^0.15.0`.

## Como usar

### 1. Configuração do NestJS

Para que os decoradores funcionem corretamente interceptando as requisições, é obrigatório ativar o `ValidationPipe` globalmente no arquivo de inicialização do NestJS (`main.ts`), ou localmente em seus controllers (caso não use o pipe global).

```typescript
// src/main.ts
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita a validação global
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
```

### 2. Validação de DTO (Data Transfer Object)

Importe o decorador `@IsCPF` e aplique-o às propriedades do seu DTO. O decorador valida o CPF verificando tanto o formato (com ou sem pontuação) quanto a integridade matemática dos dígitos verificadores.

```typescript
// src/users/dto/create-user.dto.ts
import { IsString, IsNotEmpty } from "class-validator";
import { IsCPF } from "br-class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsCPF()
  cpf: string;
}
```

### 3. Integração no Controller

Utilize o DTO tipado no seu controller. O NestJS processará a validação automaticamente antes que o método seja executado.

```typescript
// src/users/users.controller.ts
import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return {
      message: "Usuário criado com sucesso",
      data: createUserDto,
    };
  }
}
```

## Customização de Mensagens

O decorador suporta a interface `ValidationOptions` original do `class-validator`, permitindo a customização completa da mensagem de erro retornada para o cliente em caso de invalidez.

```typescript
// src/users/dto/update-user.dto.ts
import { IsCPF } from "br-class-validator";

export class UpdateUserDto {
  @IsCPF({ message: "O documento fornecido não é um CPF válido." })
  cpf: string;
}
```

## Decoradores Disponíveis

- `@IsCPF()`: Valida se a string fornecida é um CPF brasileiro válido (avalia os dígitos verificadores e formato com ou sem pontuação).

## Próximos Passos

A biblioteca está em constante evolução. Nossa próxima atualização incluirá:

- `@IsCNPJ()`: _(Em desenvolvimento)_ Validador de Cadastro Nacional da Pessoa Jurídica (CNPJ), que irá suportar checagem dos dígitos verificadores matemáticos, bem como formatos com ou sem máscara de pontuação.

## Contribuição

Contribuições, issues e pedidos de novas funcionalidades são bem-vindos!
Sinta-se à vontade para verificar a [página de issues](https://github.com/leonardotironi/br-class-validator/issues).

## Autor

- **Leonardo Tironi** - [Github](https://github.com/leonardotironi)
