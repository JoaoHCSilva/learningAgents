
# 🎓 Learning Agent

Um agente que atua como **Mentor Sênior e Professor de Engenharia de Software** diretamente no seu VSCode.

Foco 100% didático — ele **nunca** modifica seu código. Apenas lê, analisa e gera material de aprendizado em arquivos markdown.

## Como Usar

Os comandos funcionam diretamente no chat do **GitHub Copilot** ou **Antigravity** no VSCode:

### `/la-explain <tema>`
Gera uma explicação didática sobre qualquer conceito técnico.

```
/la-explain Clean Architecture
/la-explain Micro-frontends
/la-explain SOLID Principles
/la-explain Docker Compose
```

### `/la-review`
Analisa as alterações recentes do seu código (git diff) e explica o que mudou, por quê e o impacto.

```
/la-review
```

### `/la-file <arquivo>`
Explica um arquivo específico do projeto — estrutura, padrões, conceitos e como se conecta ao resto.

```
/la-file src/main.ts
/la-file controllers/AuthController.php
```

## Estrutura dos Arquivos Gerados

Todo material é salvo na pasta `explicacoes/` e segue uma estrutura padronizada:

1. **📖 Explicação do Tema** — Definição clara, funcionamento, quando usar e quando não usar
2. **🔧 Exemplos Práticos** — Casos reais da indústria, código comentado, comparações
3. **💡 Resumo e Próximos Passos** — Pontos-chave, desafio prático, referências

## Setup

Para usar em **qualquer projeto**, copie a pasta `.agents/` para a raiz do seu repositório:

```sh
cp -r .agents/ /caminho/do/seu/projeto/.agents/
```

Os comandos `/la-*` estarão disponíveis automaticamente no chat do VSCode.

## Filosofia

- 🔒 **Read-Only**: Nunca modifica código do projeto
- 🎯 **Didático**: Ensina através de reflexão, não de respostas prontas
- 🏢 **Casos Reais**: Ancora conceitos em exemplos da indústria
- 📝 **Materializado**: Toda explicação vira um arquivo `.md` consultável

----
> Desenvolvido para transformar qualquer repositório em uma oportunidade de aprendizado profundo.
