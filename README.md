# App

GymPass style app

## RFs (requisitos funcionais)

- [x] deve ser possível se cadastrar;
- [x] deve ser possível se autenticar;
- [x] deve ser possível obter o perfil de um usuário logado;
- [x] deve ser possível obter um número de check-ins realizados pelo usuário logado;
- [x] deve ser possível o usuário obter seu histórico de check-ins;
- [x] deve ser possível o usuário buscar academias próximas (até 10km);
- [x] deve ser possível o usuário buscar academias pelo nome;
- [x] deve ser possível o usuário realizar check-in em uma academia;
- [x] deve ser possível validar o check-in de um usuário;
- [x] deve ser possível cadastrar uma academia;

## RNs (regras de negócio)

- [x] o usuário não pode se cadastrar com um email duplicado;
- [x] o usuário não pode fazer check-ins no mesmo dia;
- [x] o usuário não pode fazer check-ins se não estiver a 100m da academia;
- [x] o check-in só pode ser validado 20 minutos após criado;
- [x] o check-in só pode ser validado por administradores;
- [x] a academia só pode ser cadastrada por administradores;

## RNFs (requisitos não funcionais)

- [x] a senha do usuário precisa estar criptografada;
- [x] os dados da aplicação precisam estar em um banco PostgresSQL;
- [x] todas as listas de dados precisam estar paginadas com 20 items por página;
- [x] o usuário deve ser identificado por um JWT;