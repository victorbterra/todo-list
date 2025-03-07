# Todo List - Projeto Full Stack

# 📝 Todo List

Uma aplicação full stack para gerenciamento de tarefas usando React, Node.js, Express e MongoDB.

## 🚀 Tecnologias

**Frontend:**

- React.js (Vite)
- Tailwind CSS
- Axios
- React Icons

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- Prisma ORM
- CORS
- dotenv

## ✨ Funcionalidades

- Adicionar novas tarefas
- Marcar tarefas como concluídas
- Editar tarefas existentes
- Excluir tarefas

## 🛠️ Instalação

### Backend

```bash
# Clone o repositório
git clone [seu-repositorio]
cd todo-list

# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env e adicione:
MONGO_URI=sua_url_do_mongodb

# Inicie o servidor
npm run dev

```

### Frontend

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie a aplicação
npm run dev

```

## 📁 Estrutura do Projeto

```
todo-list/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── TaskList.jsx
    │   ├── api.js
    │   ├── App.jsx
    │   └── index.css
    ├── package.json
    └── tailwind.config.js

```

## 🔧 Configuração

**Variáveis de Ambiente**

Crie um arquivo .env na pasta backend com as seguintes variáveis:

```
MONGO_URI=sua_url_do_mongodb
PORT=5000

```

## 📡 API Endpoints

| **Método** | **Endpoint** | **Descrição** |
| --- | --- | --- |
| GET | /api/tasks | Lista todas as tarefas |
| POST | /api/tasks | Cria uma nova tarefa |
| PUT | /api/tasks/:id | Atualiza uma tarefa |
| DELETE | /api/tasks/:id | Remove uma tarefa |


## 📌 Estrutura do Banco de Dados
no projeto, escolhi usar o banco de dados MongoDB, Onde os dados serão armazenados em uma coleção chamada tasks dentro de um banco de dados que podemos chamar de todo_app.

🗂 Modelo de Tarefa (Task)
Cada tarefa terá os seguintes atributos:

| **Campo**	| **Tipo**	| **Descrição**
| --------  | --------- | ------------ |
| _id	| ObjectId	| Identificador único gerado pelo MongoDB |
| title	| String	| Título da tarefa |
| description |	String | Descrição opcional da tarefa |
| completed	| Boolean | Define se a tarefa foi concluída (true) ou não (false) |
| priority | String | Prioridade da tarefa ("Baixa", "Média", "Alta") |
| dueDate | Date | Data de vencimento da tarefa |
| createdAt | Date | Data de criação da tarefa |


## 🤝 Contribuição

- Faça um fork do projeto
- Crie uma branch para sua feature (`git checkout -b feature: Maravilhosa Feature`)
- Commit suas mudanças (`git commit -m 'Add some Maravilhosa Feature'`)
- Push para a branch (`git push origin feature: Maravilhosa Feature`)
- Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

Victor Terra