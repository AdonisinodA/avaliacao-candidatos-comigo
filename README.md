### [Desafio](https://github.com/comigotech/avaliacao-candidatos-fullstack)


# BACK-END
### Requisitos para executar o projeto
- Node v20
- Docker V27 (Docker nesta versão já vem com o utilitário `docker compose`) cuidado ao tentar rodar o projeto com o `docker-compose` comando similar porém binário diferente.

### Como executar o projeto

- Entre na pasta `back-end`
- Crie um arquivo ``.env`` na raiz do projeto, terá um exemplar chamado ``.env.example``com todas as variáveis necessárias para executar o projeto.
- Use o comando ``npm run database:up`` para subir o banco de dados postgres
- O comando ``npm run database:up`` utiliza `docker compose`, caso utilize o `docker-compose` use o comando `docker-compose up --build`
- Para executar o projeto é necessário o comando `npm i` para instalar as dependências.
- Após instalar as dependências, execute o projeto com `npm run dev`, aparecerá um log localhost com a porta que foi definida na variável `PORT` no .env ou na porta 3001 como padrão.
 
 ### Modelo entidade relacionamento
 ![ER](./diagram.png "Logotipo do Projeto")

### TODO
- [x] 1. Nível 1 - Validação
- [x] 2. Nível 2 - Persistência
- [x] 3. Nível 3 - Autenticação
- [x] 4. Nível 4 - Gerenciamento de permissões
- [x] 5. Nível 5 - Testes
- [x] 6. Nível 6 - Infra
- [ ] 7. Nível 7 - Cloud
- [ ] 8. Nível 8 - Monitoramento e Observabilidade

# Front-end

### TODO
- [ ] 1. Nível 1 - Cadastro
- [ ] 2. Nível 2 - Conectando na API
- [ ] 3. Nível 3 - Listando
- [ ] 4. Nível 4 - Autenticação
- [ ] 5. Nível 5 - Testes 
