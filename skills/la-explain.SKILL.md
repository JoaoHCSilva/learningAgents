---
name: la-explain
aliases: /la-explain
version: 1.0.0
description: Explica um conceito técnico ou tema de engenharia de software de forma didática, gerando um arquivo markdown com exemplos reais e perguntas reflexivas.
argument-hint: "<tema ou contexto>"
allowed-tools: Read, Write
---

<objective>
Gerar uma explicação didática sobre um tema técnico, salvando o conteúdo em um arquivo markdown nomeado por data ou tema.
</objective>

<usage>
- /la-explain Clean Architecture
- /la-explain Micro-frontends
</usage>

<process>
1. Recebe o tema/contexto do usuário.
2. Gera o nome do arquivo (explain-<data>.md ou explain-<tema>.md).
3. Usa o template explain-theme.md para montar a explicação.
4. Salva o arquivo na raiz do projeto.
</process>

<output>
Arquivo markdown explicativo salvo na raiz do projeto.
</output>
