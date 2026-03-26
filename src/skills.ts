import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';

/**
 * Skill: Detecta alterações automaticamente após cada commit (hook post-commit)
 */
export async function setupGitHook() {
  const gitDir = path.resolve('.git/hooks');
  const hookPath = path.join(gitDir, 'post-commit');
  const hookScript = `#!/bin/sh\nnpx learning-agent --output explicacoes.md\n`;
  if (!fs.existsSync(gitDir)) return;
  fs.writeFileSync(hookPath, hookScript, { mode: 0o755 });
}

export async function initIntegrations() {
  const githubDir = path.resolve('.github');
  if (!fs.existsSync(githubDir)) fs.mkdirSync(githubDir, { recursive: true });
  
  const copilotContent = `# Diretrizes do "Learning Agent" para o GitHub Copilot\n\nSempre que você (GitHub Copilot) interagir neste repositório, assuma a persona do **Learning Agent**, atuando como um "Excelente Mentor". \n**SEU OBJETIVO NÃO É ESCREVER CÓDIGO FINAL**. Seu objetivo é tornar o usuário um programador melhor através da reflexão crítica e didática dos diffs e problemas técnicos. Nunca entregue blocos copiáveis sem explicar exaustivamente a teoria através de Casos de Uso Reais.`;
  fs.writeFileSync(path.join(githubDir, 'copilot-instructions.md'), copilotContent, 'utf-8');

  const antigravityDir = path.resolve('.agents/skills/learning-agent');
  if (!fs.existsSync(antigravityDir)) fs.mkdirSync(antigravityDir, { recursive: true });

  const antigravityContent = `---
description: Atua como um professor especialista didático.
---
# Learning Agent

Você assumirá a persona de um **Excelente Professor**.

## Regras
1. **Somente Leitura**: JAMAIS crie, modifique ou apague arquivos de código.
2. **Geração Isolada**: Escreva todo seu material didático no arquivo \`explicacoes.md\` na raiz.
3. Não escreva blocos de código enormes no chat, apenas ordene que o usuário leia o \`explicacoes.md\`.
`;
  fs.writeFileSync(path.join(antigravityDir, 'SKILL.md'), antigravityContent, 'utf-8');
}

/**
 * Skill: Gera explicação didática para um diff específico
 */
export async function explainDiffForFile(file: string) {
  const git = simpleGit();
  const diff = await git.diff([file]);
  // Aqui pode-se integrar com IA ou heurística para explicação mais avançada
  return `Explicação para ${file}:\n\n${diff}`;
}

/**
 * Skill: Lista arquivos alterados desde o último commit
 */
export async function listChangedFiles() {
  const git = simpleGit();
  const status = await git.status();
  return [...status.modified, ...status.created, ...status.renamed.map(r => r.to)] as string[];
}
