# 🎓 Learning Agent

Um agente CLI para explicar alterações de código, reforçar conceitos de engenharia de software e atuar como seu mentor particular de programação.

O **Learning Agent** adota uma abordagem *Read-Only* (somente leitura). Ele **nunca** vai escrever código para você copiar e colar. Em vez disso, ele gerará aulas e reflexões ricas no arquivo `explicacoes.md` do seu projeto.

## 🚀 Instalação e Uso Automático via NPX

Você não precisa instalar! Pode rodar direto com o `npx`:

```sh
# Para explicar as alterações de código locais (git diff)
npx learning-agent@latest

# Para acionar uma aula teórica sobre um conceito ancorado na prática
npx learning-agent@latest explain "Clean Architecture"
```

## 💻 Instalação Global (Recomendado)

Se preferir instalar globalmente na sua máquina para usar os atalhos curtos:

```sh
npm install -g learning-agent
```

Após instalar, você terá acesso a dois comandos poderosos em qualquer diretório:

1. **`learning-agent`**: Analisa as mudanças não "commitadas" (diff do Git) e gera uma revisão didática orientando a evolução do código.
2. **`la-explain <TEMA>`**: Escreve o assunto que você quer aprender, e o agente trará casos de usos reais na indústria formados num layout de aula. Exemplo: `la-explain "Micro-frontends"`.

## 🤖 Integrações Nativas
O projeto foi moldado para funcionar nativamente no topo de workflows com inteligência artificial!

### Para Github Copilot 🐙
Adicione nosso arquivo `.github/copilot-instructions.md` no seu projeto alvo. Ele instruirá o chat do Copilot a adotar a persona de professor exigente, focada no aprendizado via casos reais.

### Para Antigravity 🌌
Em projetos suportados, usamos um `SKILL.md` customizado (pasta `.agents/skills/learning-agent`) para permitir acionamento do agente sem consumir dependências locais pesadas.

---
> Desenvolvido para promover o aprendizado contínuo durante o desenvolvimento prático do dia a dia.
