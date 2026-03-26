import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function explainChanges(outputFile: string) {
  const git = simpleGit();
  const status = await git.status();
  const changedFiles = [...status.modified, ...status.created, ...status.renamed.map(r => r.to)] as string[];

  if (changedFiles.length === 0) {
    console.log(chalk.yellow('Nenhuma alteração detectada.'));
    return;
  }

  let explanations = `# Explicação das Alterações Recentes\n\n`;

  for (const file of changedFiles) {
    explanations += await explainFileChange(file, git);
  }

  fs.writeFileSync(outputFile, explanations, 'utf-8');
  console.log(chalk.green(`Explicação salva em ${outputFile}`));
}

async function explainFileChange(file: string, git: SimpleGit) {
  let diff = '';
  try {
    diff = await git.diff([file]);
  } catch {
    diff = '';
  }
  if (!diff) return '';

  // Explicação didática simplificada
    let explanation = `## Alterações em \`${file}\`\n`;
    explanation += `\n\`Diff resumido\`:\n`;
    explanation += '```diff\n' + diff.split('\n').slice(0, 20).join('\n') + '\n```\n';
    explanation += `\n### O que você pode aprender:\n- Analise as linhas adicionadas (+) e removidas (-)\n- Reflita sobre o motivo das mudanças\n\n---\n`;
  return explanation;
}
