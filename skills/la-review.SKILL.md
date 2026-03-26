---
name: la-review
aliases: /la-review
version: 1.0.0
description: Gera uma explicação didática das alterações recentes do código (git diff), salvando em markdown.
argument-hint: ""
allowed-tools: Read, Write
---

<objective>
Analisar as alterações recentes do código e gerar um arquivo markdown explicativo, destacando o que mudou, por quê e o impacto arquitetural.
</objective>

<usage>
- /la-review
</usage>

<process>
1. Detecta alterações recentes (git diff).
2. Gera o nome do arquivo (explain-<data>.md ou explain-review.md).
3. Usa a função explainChanges para montar a explicação.
4. Salva o arquivo na raiz do projeto.
</process>

<output>
Arquivo markdown explicativo salvo na raiz do projeto.
</output>
