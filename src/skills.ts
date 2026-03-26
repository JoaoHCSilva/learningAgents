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
