# 🎓 Learning Agent

Um agente desenvolvido para atuar como seu **Mentor Sênior e Professor de Engenharia de Software**.
Ele possui foco estritamente didático (*Read-Only*) e nunca escreverá código estrutural no repositório. O papel dele é ler suas necessidades ou mudanças em código e gerar aulas, dicas e reflexões detalhadas diretamente em um arquivo `explicacoes.md` criado na raiz do seu projeto.

Existem 3 formas principais de utilizar os poderes deste agente, dependendo da sua preferência:

## 1. Como um CLI Global (Recomendado para uso diário)
A melhor forma de ter o agente rápido e sempre disponível no seu terminal é instalando-o globalmente. **Você só precisa executar isso uma única vez:**

```sh
npm install -g learning-agent
```

Após instalar, você ganhará comandos rápidos que podem ser executados instantaneamente em qualquer pasta do seu computador:
- **`la-explain "NOME DO TEMA"`**: Pede ao agente para montar uma aula teórica fundamentada em **casos reais da indústria** a respeito de um conceito. *(Ex: `la-explain "Micro-frontends"`)*.
- **`learning-agent`**: Faz o agente ler as mudanças do seu código atual (`git diff`) e gerar uma revisão focada em melhorar a sua forma de programar, refletindo sobre as linhas adicionadas ou apagadas.

## 2. Como Execução Única (via `npx`)
Se você quer rodar a ferramenta em uma máquina temporária ou simplesmente não quer instalar globalmente, você pode executar buscando a versão mais recente em tempo real da internet:

```sh
npx learning-agent@latest explain "Clean Architecture"
```
*(Nota: O npx baixa e roda em background sem salvar o binário, o que torna a execução inicial marginalmente mais lenta).*

## 3. Direto nos "Chats" das IAs (Integrações Passivas)
O *learning-agent* também é um ecossistema projetado para infectar as IAs do seu editor de textos, forçando-as a aturarem como professoras. Você nem precisa abrir o terminal!

### 🪄 Auto-Configuração Rápida
Você não precisa copiar nenhum arquivo manualmente! Vá até a raiz de qualquer projeto seu e rode:
```sh
npx learning-agent@latest init
```
*(Ou `learning-agent init` se já instalou globalmente).*

Este único comando mágico vai criar nativamente todos os arquivos invisíveis para reprogramar as duas principais ferramentas do mercado:

#### 🌌 O Caminho Antigravity (Skill)
O comando criará a skill automática para você. Se você usa o Antigravity, **basta pedir no chat do seu editor**:
> *"/learning-agent explique os prós e contras da arquitetura Serverless."*
O próprio Antigravity vai ler os parâmetros dessa skill gerada e construir o material didático usando a sua inteligência nativa.

#### 🐙 O Caminho GitHub Copilot
O comando também configurará as **Copilot Instructions**. Logo após executar o `init`, o seu Chat do GitHub Copilot será reconfigurado silenciosamente. Ele deixará de vomitar "códigos prontos com falhas" e adotará imediatamente a persona encorajadora do Learning Agent, ajudando-o a refatorar melhor através de orientações reflexivas.

---
> Desenvolvido para transformar qualquer repositório de código e chat corporativo em uma oportunidade imediata de aprendizado profundo.
