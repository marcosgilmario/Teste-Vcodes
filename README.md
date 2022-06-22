# SISTEMA FULLSTACK

## GUIA DA DOCUMENTAÇÃO

1. [Autor](#autor)
2. [Tecnologias utilizadas](#tecnologias-utilizadas)

   2.1. [Tecnologias Front-end](#front-end)

   2.2. [Tecnologias Back-end](#back-end)

3. [Como executar o sistema](#como-executar-o-sistema)

   4.1. [Executar com o Docker](#executar-com-o-docker)

   4.1. [Executar sem o Docker](#executar-com-o-docker)

---

## AUTOR:

- MARCOS GILMÁRIO FERREIRA MOREIRA

---

## TECNOLOGIAS UTILIZADAS:

### Front-end:

- ReactJS
- Axios
- Bootstrap

### Back-end:

- NodeJS
- Express
- Sequelize
- Postgresql
- Docker

---

# Como executar o sistema

---

## Executar com o Docker
--
1. Clone o reposiório:

`$ git clone https://github.com/marcosgilmario/Teste-Vcodes.git`

2. Acesse os arquivos do repositório:

   `$ cd Teste-Vcodes`

3. Instale as dependências

Instale as dependências do front-end

`$ cd /front-vcodes-test`

`$ npm install` ou `$ yarn install`

Retorne à pasta principal

`$ cd ..`

Agora instale as dependencias do back-end (opcional)

`$ cd /front-vcodes-test`

`$ npm install` ou `$ yarn install`

Retorne à pasta principal

`$ cd ..`

4. Com o docker ativo execute:

   `$ docker compose up --build -d`

5. Após o fim da inicialização do container abra o `http://localhost:3000` em um navegador

## OBS:

1. caso queira executar no próprio banco do docker antes de inicializar o container altere a url base de requisição da api em `/front-vcodes-test/src/services/api.js` para `http://localhost:5000`

--
## Executar sem o Docker
--

OBS: Dependencias do backend

- Criar uma conexão de banco de dados local e editar as informações em referentes à conexão em `/backend-vcodes-test/consig/config.json`

1. Execute os passos 1, 2 e 3 na [sessão anterior](#executar-com-o-docker) incluindo a instalação de dependencias do backend

2. Na pasta principal do repositório acesse ambas as pastas `/front-vcodes-test` e `/backend-vcodes-test` em terminais diferentes e então execute em cada terminal

`$ npm start` ou `yarn start`

3. Após o fim da inicialização nos dois terminais abra o `http://localhost:3000` em um navegador

