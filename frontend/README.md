# ID Wallet — Frontend

Aplicação web para a carteira de identidade digital de intérpretes profissionais.
A interface permite ao intérprete consultar seu perfil verificado, gerenciar
credenciais profissionais, acompanhar o histórico de trabalhos e conversar com um
assistente de IA — tudo com suporte offline através de PWA.

O conceito é inspirado na carteira de identidade digital europeia (EU eIDAS 2.0):
credenciais emitidas por entidades confiáveis, com níveis de confiança e validade,
apresentadas de forma centralizada e portátil.

## Stack

- **React 19** com **TypeScript**
- **Vite** como bundler e servidor de desenvolvimento
- **Tailwind CSS 4** para estilização
- **React Router** para navegação
- **Zustand** para estado global (conversa do assistente)
- **Axios** para chamadas REST
- **vite-plugin-pwa** (Workbox) para instalação e funcionamento offline

## Pré-requisitos

- Node.js 20 ou superior
- npm
- O backend em execução (a aplicação consome a API em `/api`, redirecionada por
  proxy para `http://localhost:3333`)

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`. As requisições para `/api`
são encaminhadas automaticamente para o backend em `http://localhost:3333`.

## Scripts disponíveis

| Comando           | Descrição                                              |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Servidor de desenvolvimento com HMR                    |
| `npm run build`   | Verificação de tipos (`tsc -b`) e build de produção    |
| `npm run preview` | Servidor local para inspecionar o build de produção    |
| `npm run lint`    | Análise estática com ESLint                            |

## Estrutura do projeto

```
src/
├── components/      Componentes de interface
│   ├── Screens/     Telas principais (Dashboard, Wallet, AI)
│   ├── Sections/    Blocos de conteúdo (listas, chat, menu lateral)
│   ├── Cards/       Cartões de credencial, trabalho e carteira
│   ├── Modal/       Janelas modais (perfil, credencial, histórico)
│   ├── Pages/       Estrutura de layout (header, conteúdo, banners)
│   ├── Buttons/     Ações isoladas (tema, conexão, avatar)
│   ├── Icons/       Ícones em SVG como componentes React
│   └── ui/          Primitivos reutilizáveis (Button, Card, Modal, etc.)
├── context/         Contextos de tema e estado de conexão
├── hooks/           Hooks de dados e controle de UI
├── services/        Camada de acesso à API (REST e streaming SSE)
├── stores/          Estado global com Zustand
├── types/           Tipos e contratos de dados
├── lib/             Funções utilitárias
├── routes.ts        Definição declarativa das rotas
├── App.tsx          Composição do layout e roteamento
└── main.tsx         Ponto de entrada e providers
```

## Arquitetura

A interface é organizada em três telas, declaradas em `src/routes.ts`:

- **Dashboard** — visão geral do perfil, estatísticas e histórico de trabalhos.
- **Wallet** — credenciais profissionais com status (verificada, expirando,
  expirada) e nível de confiança (alto, médio, baixo).
- **AI Assistant** — conversa com o assistente, em destaque na navegação mobile.

O acesso aos dados é centralizado na camada `services/`. As consultas comuns usam
Axios sobre a API REST (`/api/profile`, `/api/credentials`, `/api/jobs`). Os
recursos de IA usam streaming via Server-Sent Events, consumindo a resposta em
tempo real conforme o modelo gera o texto (chat, geração de perfil e explicação do
nível de confiança de uma credencial).

O estado é mantido próximo de onde é usado: hooks dedicados encapsulam o
carregamento de cada recurso, o tema e a conexão vivem em React Context, e a
conversa do assistente fica em uma store Zustand para persistir entre as telas.

## Tema claro e escuro

O tema é selecionado automaticamente a partir da preferência do sistema e pode ser
alternado pelo usuário. A escolha é salva em `localStorage` e aplicada antes da
renderização (script inline em `index.html`) para evitar o flash de tema incorreto.

## Suporte offline (PWA)

A aplicação é instalável e funciona offline. Os recursos estáticos são pré-cacheados
e as respostas de `/api/profile`, `/api/credentials` e `/api/jobs` seguem a
estratégia *stale-while-revalidate*, permitindo a consulta dos dados mesmo sem rede.
Um indicador de conexão e um banner informam o usuário quando o backend está
inacessível, verificando a disponibilidade através de um probe periódico à API.

## Build de produção

```bash
npm run build
npm run preview
```

O `build` executa a verificação de tipos antes de gerar os arquivos otimizados em
`dist/`. O `preview` serve esse build localmente, também com proxy para a API.
