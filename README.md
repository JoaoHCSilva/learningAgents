# Learning Agent

Agente CLI para explicar alterações de código e promover aprendizado incremental.

## Instalação via npx

```sh
npx learning-agent@latest
```

## Instalação do hook automático

```sh
npx learning-agent --hook
```

## Uso

Execute na raiz do seu projeto:

```sh
learning-agent --output explicacao-alteracoes.md
```

- O agente detecta arquivos alterados (git) e gera um arquivo markdown com explicações didáticas.
- O arquivo padrão é `explicacao-alteracoes.md`.

## Skills
- Explicação didática de código
- Geração automática de documentação
- Integração automática com git hook
- Foco em aprendizado incremental

---

> Desenvolvido para promover o aprendizado contínuo durante o desenvolvimento de software.
