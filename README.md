# Smartphone Information App

Este projeto é uma aplicação desktop desenvolvida com Electron, React, TypeScript, Express, e SQLite3. Ele permite ao usuário pesquisar informações de smartphones e exibi-las de forma dinâmica. O banco de dados SQLite armazena as informações dos smartphones, e a interface foi construída utilizando React com Vite.

# Tecnologias Utilizadas

Vite - Para iniciar o projeto com `npm create @quick-start/electron@latest`
Electron - Para criar a aplicação desktop
TypeScript - Linguagem utilizada para garantir tipagem estática
React - Biblioteca para construção da interface do usuário
Express - Para criação da API backend
SQLite3 - Banco de dados leve e embutido para armazenamento das informações
Como Executar o Projeto
Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:

Node.js versão 14.x ou superior
npm
Instalação
Clone o repositório:
bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Instale as dependências do projeto:
bash
Copiar código
npm install
Nota: Para instalar o SQLite3 corretamente, use o seguinte comando, pois houve problemas com o node-gyp na instalação padrão:

bash
Copiar código
npm install -E sqlite3@5.1.6
Executando no Ambiente de Desenvolvimento
Para iniciar o projeto no ambiente de desenvolvimento:
bash
Copiar código
npm run dev
Isso irá iniciar tanto o backend Express quanto a aplicação Electron com React.

Gerando o Build para Produção
Para gerar um build da aplicação para Windows, utilize o seguinte comando:
bash
Copiar código
npm run build:win
Isso criará um executável para a aplicação que incluirá o banco de dados SQLite3 e todo o código compilado.

Estrutura do Projeto
/src: Contém o código fonte da aplicação React.
/electron: Contém os arquivos principais do Electron, como o processo principal.
/public: Arquivos estáticos da aplicação.
/backend: API criada com Express para interagir com o banco de dados SQLite.
Banco de Dados SQLite
O banco de dados utilizado é SQLite3, que é armazenado localmente na pasta userData da aplicação Electron no ambiente de produção. Para garantir a compatibilidade, utilizou-se a versão 5.1.6 do pacote sqlite3.

bash
Copiar código
npm install -E sqlite3@5.1.6
Isso foi necessário devido a problemas encontrados com a instalação padrão via npm install sqlite3, que gerava erros relacionados ao node-gyp.

Problemas Conhecidos
Problemas com a instalação padrão do sqlite3: Ao tentar instalar o pacote sem a versão fixa, ocorriam erros com o node-gyp. O uso da versão 5.1.6 resolve esse problema.
Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
