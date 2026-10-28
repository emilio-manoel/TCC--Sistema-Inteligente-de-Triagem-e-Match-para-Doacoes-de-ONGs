# 🤝 Sistema Inteligente de Triagem e Match para Doações de ONGs

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

## 📌 Sobre o Projeto

O **Sistema Inteligente de Triagem e Match para Doações de ONGs** é um projeto desenvolvido como parte do meu Trabalho de Conclusão de Curso (TCC), com a proposta de utilizar a tecnologia para facilitar a conexão entre pessoas interessadas em doar e Organizações não governamentais (ONGs) que necessitam de recursos.

A plataforma busca tornar o processo de doação mais organizado e direcionado, utilizando uma interface conversacional para coletar informações sobre as necessidades do doador e apresentar organizações potencialmente compatíveis com sua solicitação.

Este repositório contém o **Front-End da aplicação**, responsável pela interface com o usuário, pela apresentação das informações e pela comunicação com o back-end, que processa as solicitações e retorna os resultados da triagem.

O projeto une desenvolvimento de software e impacto social, buscando demonstrar como soluções digitais podem contribuir para aproximar doadores de organizações que precisam de apoio.

---

## 💻 Funcionalidades do Front-End

### 💬 Assistente Conversacional

A interface permite que o usuário interaja com um assistente por meio de mensagens. A conversa conduz a coleta de informações necessárias para compreender a solicitação e dar continuidade ao processo de triagem.

O front-end também apresenta os estados de carregamento e as respostas recebidas do servidor, proporcionando uma experiência de interação mais clara.

### 🎯 Apresentação de Correspondências

Quando o back-end retorna uma correspondência concluída, a interface apresenta a mensagem com o resultado do processamento e pode exibir as organizações identificadas como compatíveis com a solicitação.

Essa integração permite que o usuário visualize os resultados sem precisar lidar diretamente com os dados técnicos da API.

### 🗺️ Mapa de Localização

A aplicação conta com um mapa interativo para apresentar a localização das organizações retornadas pelo sistema.

Por meio do mapa, o usuário pode visualizar marcadores, consultar informações como nome e endereço da organização e abrir sua localização no Google Maps.

### 🏢 Cadastro de ONGs

O sistema possui um formulário para envio de informações das organizações que desejam participar da plataforma.

O formulário contempla dados como CNPJ, razão social, endereço, município, áreas de atuação, contatos e necessidades de doação. As informações preenchidas são encaminhadas ao back-end para processamento.

### 🕘 Histórico de Conversas

A aplicação disponibiliza uma seção para consultar conversas anteriores, permitindo retomar interações salvas e excluir registros do histórico.

O armazenamento desse histórico é realizado no `localStorage` do navegador, possibilitando a persistência local das conversas.

---

## 🚀 Tecnologias Utilizadas

### ⚛️ React

O React é a principal biblioteca utilizada na construção da interface. Ele permite dividir a aplicação em componentes reutilizáveis e atualizar a tela dinamicamente conforme os dados e as interações do usuário mudam.

### 🔷 TypeScript

O TypeScript adiciona tipagem estática ao JavaScript, ajudando a identificar inconsistências nos dados e tornando o código mais organizado, seguro e fácil de manter.

### ⚡ Vite

O Vite fornece o ambiente de desenvolvimento e o processo de compilação da aplicação. Ele facilita a execução local, a atualização durante o desenvolvimento e a geração dos arquivos para publicação.

### 🎨 Tailwind CSS

O Tailwind CSS é utilizado para estilizar a interface por meio de classes utilitárias, facilitando a criação de layouts, espaçamentos, cores, tipografia e adaptações para diferentes tamanhos de tela.

### 🧭 React Router

O React Router gerencia a navegação entre as páginas da aplicação, como a interface de conversa, o histórico de interações e o formulário de cadastro de ONGs.

### 🔌 Axios

O Axios é responsável pelas requisições HTTP realizadas pelo front-end. Por meio dele, a aplicação envia mensagens ao back-end e encaminha os dados preenchidos no formulário de cadastro.

### 🗺️ Leaflet e React Leaflet

Essas bibliotecas permitem incorporar mapas interativos à interface, exibindo marcadores e informações geográficas das organizações retornadas pelo sistema.

### 🎨 Lucide React

Biblioteca de ícones utilizada para complementar a interface e tornar as ações e os elementos visuais mais intuitivos.

### 📝 React Markdown

Utilizado para renderizar conteúdo recebido em formato Markdown, permitindo apresentar mensagens formatadas na interface conversacional.

---

## 🔗 Comunicação com o Back-End

O front-end trabalha em conjunto com uma API responsável pelo processamento das solicitações.

Entre as operações realizadas pela interface estão:

- **Triagem de doações:** envio das mensagens da conversa para o endpoint responsável pela identificação de organizações compatíveis.
- **Cadastro de organizações:** envio dos dados preenchidos no formulário para o servidor.
- **Exibição dos resultados:** apresentação das respostas, das organizações encontradas e de suas informações geográficas.

A comunicação é realizada por requisições HTTP utilizando Axios. A URL-base da API pode ser configurada pela variável de ambiente `VITE_BACKEND_URL`, permitindo separar a configuração do serviço do código da interface.

---

## 🎯 Objetivos Alcançados

O desenvolvimento do front-end deste TCC representa uma oportunidade de aplicar conhecimentos de desenvolvimento web em uma solução voltada a um problema social.

Entre os principais conhecimentos trabalhados estão:

- Construção de interfaces com React e TypeScript;
- Componentização e organização de aplicações;
- Gerenciamento de estado e formulários;
- Navegação entre páginas com React Router;
- Integração com APIs por meio de requisições HTTP;
- Tratamento de respostas, carregamentos e erros;
- Persistência de dados no navegador;
- Integração de mapas interativos;
- Desenvolvimento de interfaces responsivas;
- Organização de código para facilitar a manutenção e a evolução do sistema.

Além do aprendizado técnico, o projeto exige atenção à experiência do usuário e à forma como as informações são apresentadas, especialmente por se tratar de uma plataforma destinada a facilitar ações de solidariedade.

---

## 🌱 Importância do Projeto na Minha Formação

Como estudante que busca se tornar um **Desenvolvedor Full-Stack**, desenvolver este front-end representa uma etapa importante da minha formação.

O projeto permite trabalhar com uma aplicação que vai além de páginas estáticas, reunindo navegação, formulários, armazenamento local, mapas e integração com serviços externos.

Também reforça a importância de separar as responsabilidades da aplicação: enquanto o front-end cuida da interação com o usuário, o back-end é responsável pelo processamento das solicitações e pela lógica necessária à triagem e ao match.

A experiência contribui para consolidar conhecimentos técnicos e para desenvolver a capacidade de transformar requisitos de um projeto acadêmico em uma interface funcional, organizada e voltada às necessidades dos usuários.

---

## 🔗 Links do Projeto

- 🌍 **Aplicação on-line:** [Acessar o sistema](https://sistema-inteligente-de-triagem-para-doacao-de-ongs-three.vercel.app/)
- 💻 **Repositório Front-End:** [GitHub front-end](https://github.com/emilio-manoel/TCC--Sistema-Inteligente-de-Triagem-e-Match-para-Doacoes-de-ONGs)
- 🖥️ **Repositório Back-End:** [GitHub back-end](https://github.com/emilio-manoel/TCC--BackEnd)

---

<p align="center">
  Desenvolvido como parte do Trabalho de Conclusão de Curso em Análise e Desenvolvimento de Sistemas.
</p>