# zion

## Instalar e rodar o projeto

Você pode rodar o Zion em sua máquina local ou no Codespaces.

Dependências globais:
Node.js LTS v18 (ou qualquer versão superior)
Docker Engine v17.12.0 com Docker Compose v1.24.1 (ou qualquer versão superior)

Use o comando npm install para instalar as dependências locais do projeto.

Para rodar o projeto localmente, basta executar o comando: npm run dev
Isto irá expor um Serviço Web (Frontend e API) no seguinte endereço: http://localhost:3000/

Em outro terminal, use o comando npm run migration:up para criar as tabelas no banco de dados.

Agora já pode testar as funcionalidades.
