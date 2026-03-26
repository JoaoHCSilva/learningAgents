
# 🎓 Learning Agent

## Instalação

Você pode instalar o Learning Agent em seu projeto com:

```sh
# via npm
npm install learning-agent
# via yarn
yarn add learning-agent
# via pnpm
pnpm add learning-agent
```

Um agente desenvolvido para atuar como seu **Mentor Sênior e Professor de Engenharia de Software**.
Ele possui foco estritamente didático (*Read-Only*) e nunca escreverá código estrutural no repositório. O papel dele é ler suas necessidades ou mudanças em código e gerar aulas, dicas e reflexões detalhadas diretamente em um arquivo markdown criado na raiz do seu projeto.

## Como Usar (Skills nativas Copilot/Antigravity)

Agora, o Learning Agent funciona 100% via skills, sem necessidade de CLI, npx ou instalação global.

### Exemplos de uso direto no chat:

- **`/la-explain "Clean Architecture"`**: Gera uma explicação didática sobre o tema, salvando em `explain-clean-architecture.md`.
- **`/la-explain "Micro-frontends"`**: Gera uma aula sobre micro-frontends.
- **`/la-review`**: Analisa as alterações recentes do código e gera um arquivo explicativo.

### Como funciona

1. Digite o comando `/la-explain <tema>` ou `/la-review` no chat do Copilot ou Antigravity.
2. O agente executa a skill correspondente e salva o arquivo markdown na raiz do projeto, nomeado por data ou tema.
3. O conteúdo é sempre didático, com exemplos reais e perguntas reflexivas.

### Integração automática

Ao rodar o comando de inicialização, as instruções e skills são configuradas para Copilot e Antigravity reconhecerem os comandos `/la-*` automaticamente.

----
> Desenvolvido para transformar qualquer repositório de código e chat corporativo em uma oportunidade imediata de aprendizado profundo.
