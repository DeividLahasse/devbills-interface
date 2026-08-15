# DevBills Interface

Frontend da aplicação **DevBills**, uma plataforma de gerenciamento financeiro pessoal para controle de receitas e despesas.

## 🚀 Sobre o projeto

O **DevBills Interface** é uma aplicação web desenvolvida com React e TypeScript, integrada a uma API própria para gerenciamento de transações financeiras.

A aplicação permite autenticação com Google, cadastro e gerenciamento de transações, utilização de categorias e visualização dos dados financeiros por meio de gráficos.

## 🌐 Demo

Acesse a versão online do DevBills:

👉 https://devbills-interface-five.vercel.app/

**Aplicação em produção:**
https://devbills-interface-five.vercel.app/


## ✨ Funcionalidades

* 🔐 Autenticação com Google utilizando Firebase Authentication
* 💰 Cadastro de receitas e despesas
* 📋 Listagem de transações
* 🗑️ Exclusão de transações
* 🏷️ Categorias de receitas e despesas
* 📊 Gráficos para visualização dos dados financeiros
* 📅 Filtros por período
* 🔒 Rotas privadas para usuários autenticados
* 🔔 Notificações de ações e erros
* 📱 Interface responsiva

## 🛠️ Tecnologias

* React
* TypeScript
* Vite
* React Router
* Axios
* Firebase Authentication
* React Toastify
* CSS
* API REST
* Git / GitHub
* Vercel

## 📁 Estrutura do projeto

```text
src/
├── components/
├── config/
├── context/
├── layout/
├── pages/
├── routes/
├── services/
├── types/
├── App.tsx
└── main.tsx
```

A aplicação utiliza uma separação entre páginas, componentes, serviços de API, contexto de autenticação e tipos TypeScript.

## 🔌 Integração com a API

O frontend consome a API REST do DevBills.

As principais operações incluem:

```text
GET    /api/categories
GET    /api/transactions
POST   /api/transactions
DELETE /api/transactions/:id
GET    /api/transactions/summary
GET    /api/transactions/historical
```

A URL da API é configurada através da variável de ambiente:

```env
VITE_API_URL=https://devbills-api-production-4b40.up.railway.app
```

## 🔑 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto para desenvolvimento local:

```env
VITE_API_URL=https://devbills-api-production-4b40.up.railway.app

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

> **Importante:** não coloque valores reais de credenciais no GitHub. Utilize variáveis de ambiente e mantenha arquivos `.env` fora do repositório.

## 💻 Instalação

Clone o repositório:

```bash
git clone https://github.com/DeividLahasse/devbills-interface.git
```

Entre na pasta:

```bash
cd devbills-interface
```

Instale as dependências:

```bash
yarn install
```

ou:

```bash
npm install
```

## ▶️ Executando localmente

Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

ou:

```bash
npm run dev
```

O Vite disponibilizará a aplicação localmente, normalmente em:

```text
http://localhost:5173
```

## 🏗️ Build de produção

Para gerar o build:

```bash
yarn build
```

ou:

```bash
npm run build
```

Para testar o build localmente:

```bash
yarn preview
```

## 🌐 Deploy

O frontend está preparado para deploy na **Vercel**.

O processo de deploy pode ser integrado diretamente ao GitHub, permitindo que novos commits na branch `main` gerem novos deployments automaticamente.

## 🔐 Autenticação

A autenticação é realizada através do **Firebase Authentication**, utilizando o provedor Google.

Para produção, o domínio utilizado pelo frontend precisa estar configurado nos **domínios autorizados do Firebase Authentication**.

## 📊 Dashboard

O dashboard apresenta informações financeiras do usuário, incluindo:

* Receitas
* Despesas
* Saldo
* Resumo das transações
* Histórico financeiro
* Gráficos

Os dados são obtidos dinamicamente através da API.

## 🔗 Projetos relacionados

### DevBills API

Backend responsável pela autenticação, regras de negócio, banco de dados e gerenciamento das transações.

Repositório:

https://github.com/DeividLahasse/devbills-api

## 📌 Status do projeto

**Em desenvolvimento 🚧**

O projeto possui autenticação, categorias, gerenciamento de transações, exclusão de registros e visualização gráfica dos dados financeiros.

## 👨‍💻 Autor

**Deivid Lahasse**

Desenvolvido como projeto de gerenciamento financeiro pessoal utilizando React, TypeScript, Firebase e uma API REST própria.
