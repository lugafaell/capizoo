# Capizoo

Capizoo é uma plataforma abrangente para registro e organização de animais. Ela oferece uma maneira eficiente de gerenciar e acompanhar dados de animais, sendo ideal para clínicas veterinárias, abrigos de animais, proprietários de pets e zoologicos.

## Funcionalidades

- Interface amigável para registro de animais
- Perfis detalhados de animais com campos personalizáveis
- Registro de Fotos para os seus Pets
- Funcionalidade de busca e filtro para acesso rápido aos registros de animais
- Design responsivo para uso perfeito em desktops e dispositivos móveis

## Stack Tecnológica

- **Frontend**: Vue.js
- **Backend**: Node.js com Express
- **Banco de Dados**: MySQL
- **Conteinerização**: Docker
- **Hospedagem**: VPS Azure
- **Domínio e SSL**: Domínio personalizado (itmf.app.br) com criptografia SSL

## Arquitetura

Capizoo segue uma arquitetura de microsserviços:

1. **Serviço de Frontend**: Aplicação Vue.js que serve a interface do usuário
2. **Serviço de Backend**: API Node.js com Express que lida com a lógica de negócios e gerenciamento de dados
3. **Serviço de Banco de Dados**: MySQL.

Todos os serviços são conteinerizados usando Docker para ambientes de desenvolvimento e implantação consistentes.

## Implantação

Capizoo está implantado em um Servidor Privado Virtual (VPS) Azure usando contêineres Docker. A aplicação é acessível através do domínio personalizado disponibilizado pelo próprio Desenvolvedor https://itmf.app.br, configurado com SSL para conexões seguras.

Acesse utilizando a conta:

Usuário: BioZoo,
Senha: zoo123

Para visualizar alguns registros pré-inseridos e ver a aplicação funcionando em primeira mão, ou crie sua própria conta e Divirta-se!

## Começando

Para executar o Capizoo localmente para desenvolvimento:

1. Clone o repositório:
   ```
   git clone https://github.com/lugafaell/capizoo.git
   cd capizoo
   ```

2. Instale as dependências:
   ```
   # Instale as dependências do frontend
   cd front
   npm install

   # Instale as dependências do backend
   cd back
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie arquivos `.env` nos diretórios `front` e `back/config` baseados nos arquivos `.env.example` fornecidos.

4. Inicie os servidores de desenvolvimento:
   ```
   # Inicie o frontend
   cd front
   npm run serve

   # Inicie o backend
   cd back
   node index.js
   ```
5. Caso opte por utilizar o docker, pode simples executar o docker compose configurado na raiz do projeto para facilitar a execução:
   ```
   # Construa e execute os containers
   docker compose up --build
   ```
6. Acesse a aplicação em `http://localhost:8080` (ou na porta especificada na sua configuração de frontend). Em caso de utilização do docker acesse a porta que está expota o frontend da sua aplicação.


---

Desenvolvido com ❤️ por Rafael de Menezes
