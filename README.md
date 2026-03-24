📖 Cronos Notes - CRUD com API Pública + React 19
Aplicação de alta performance que demonstra um CRUD completo consumindo a API pública JSONPlaceholder (/posts), utilizando as novas APIs de concorrência e renderização do React 19 e Next.js 15.

🚀 Tecnologias e Padrões (React 19)
Optimistic UI (Interface Otimista): As notas são criadas, editadas e excluídas na tela instantaneamente, antes mesmo da confirmação do servidor, eliminando a percepção de latência.

Feedback Visual com react-hot-toast: Notificações elegantes e não intrusivas para confirmar o sucesso ou alertar sobre erros em cada operação do CRUD.

Hook use(): Consumo de Promises diretamente no componente BookList, integrado ao Suspense.

startTransition: Utilizado para atualizações de estado não urgentes, mantendo a UI responsiva durante a troca de Promises.

Gestão de Estado Híbrida: Como a API JSONPlaceholder é stateless (não salva mudanças), o app gerencia a sincronização local para refletir criações, edições e exclusões instantaneamente.

Suspense + Fallbacks: Esqueleto de carregamento (loading states) nativo do React.

Tailwind CSS: Design system moderno com foco em usabilidade e feedback visual.

🛠️ Funcionalidades do CRUD
O recurso principal são as Notas (mapeadas do recurso posts da API):

Create (POST): Gera um ID único via Date.now() no front-end para evitar conflitos e insere a nota no topo da lista.

Read (GET): Listagem inicial de 50 itens com suporte a busca por filtros.

Update (PUT): Atualização otimista do estado local após confirmação da API.

Delete (DELETE): Remoção imediata do item da interface com feedback via confirm.

Search: Filtro dinâmico que combina busca na API com refresh de dados.

📂 Estrutura de Arquivos
Plaintext
src/
├── api.js                # Wrapper Fetch com lógica de IDs únicos para simulação
├── app/
│   ├── page.js           # Orquestrador de estado (Promises e Transitions)
│   ├── layout.js         # Configurações de Viewport e Metadados
│   └── globals.css       # Diretivas Tailwind e resets
└── components/
    ├── BookList.jsx      # Renderização otimizada com hook use()
    └── ErrorState.jsx    # Boundary de erro amigável com retry
    
⚙️ Instalação e Execução
Requisitos: Node.js 18.17+ | npm 9+

Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev
Acesse: http://localhost:3000

ℹ️ Notas de Integração (Importante)
[!IMPORTANT]
Simulação de Persistência: A API jsonplaceholder.typicode.com é apenas para testes. Embora enviemos requisições reais de POST, PUT e DELETE, o servidor não persiste os dados.

O que fizemos: > - Implementamos uma lógica no api.js que gera IDs randômicos para novos itens.

Atualizamos o setBooksPromise manualmente no page.js após cada operação de sucesso para que as mudanças apareçam na tela sem depender do banco de dados da API pública.