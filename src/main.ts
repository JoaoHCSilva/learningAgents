import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs';
import path from 'path';

export async function explainChanges(outputFile: string) {
  const git = simpleGit();
  const status = await git.status();
  const changedFiles = [...status.modified, ...status.created, ...status.renamed.map(r => r.to)] as string[];

  if (changedFiles.length === 0) {
    throw new Error('Nenhuma alteração detectada. Puxou as mudanças da sua mente ou do git? 🤔');
  }

  let explanations = `# Aula Prática: Suas Alterações Recentes\n\nNeste documento você encontrará explicações sobre as mudanças de código.\n\n`;

  for (const file of changedFiles) {
    explanations += await explainFileChange(file, git);
  }

  fs.writeFileSync(outputFile, explanations, 'utf-8');
}

async function explainFileChange(file: string, git: SimpleGit) {
  let diff = '';
  try {
    diff = await git.diff([file]);
  } catch {
    diff = '';
  }
  if (!diff) return '';

  let explanation = `## 📝 Alterações em \`${file}\`\n\n`;
  explanation += `**O que você deve aprender aqui:**\n- Analise as linhas com \`+\` (novas construções) e \`-\` (refatorações).\n- Pense em como essa mudança impacta a arquitetura do projeto.\n\n`;
  explanation += '```diff\n' + diff.split('\n').slice(0, 30).join('\n') + '\n```\n\n---\n';
  return explanation;
}

export async function explainTheme(tema: string) {
  // Lê o template da skill do arquivo .md focado no tema
  const templatePath = path.join(__dirname, '../../skills/explain-theme.md');
  
  let content = '';
  try {
    const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
    // Substitui as variáveis do template pelo tema passado pelo usuário
    content = rawTemplate.replace(/\{\{TEMA\}\}/g, tema);
  } catch (err) {
    // Fallback caso o CLI seja executado num ambiente que perdeu o acesso ao template
    content = `# Aula: ${tema}\n\nOcorreu um erro ao carregar o template detalhado de Skills, mas continue estudando sobre **${tema}**!`;
  }
  
  fs.writeFileSync('explicacoes.md', content, 'utf-8');
}
