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

  // Contexto e resumo
  let explanations = `# Revisão Didática das Alterações\n\n`;
  explanations += `## Contexto\n- **Branch:** ${status.current || 'N/A'}\n- **Resumo:** Alterações recentes detectadas pelo Learning Agent.\n\n`;

  // Principais mudanças
  explanations += `## Principais Mudanças\n`;
  for (const file of changedFiles) {
    explanations += `- **${file}**: ${await getFileChangeSummary(file, git)}\n`;
  }
  explanations += '\n';

  // Análise de impacto
  explanations += `## Análise de Impacto\n- Avalie se as mudanças afetam o funcionamento do sistema, dependências ou performance.\n- Verifique se há riscos de bugs, regressões ou problemas de build.\n\n`;

  // Boas práticas e recomendações
  explanations += `## Boas Práticas Observadas\n- Commits atômicos e mensagens claras são recomendados.\n- Mantenha o versionamento e documentação atualizados.\n\n`;
  explanations += `## Pontos de Melhoria\n- Adicione testes automatizados para garantir integridade.\n- Atualize a documentação se necessário.\n\n`;

  // Estudo de caso
  explanations += `## Estudo de Caso\nDescreva um cenário real de uso após estas alterações. Como o sistema ou usuário será impactado?\n\n`;

  // Perguntas para reflexão
  explanations += `## Perguntas para Reflexão\n- O que motivou cada mudança?\n- Há riscos de efeitos colaterais?\n- O que testar após o merge?\n\n`;

  explanations += `---\n> *Este relatório foi gerado automaticamente pelo Learning Agent para promover reflexão crítica e aprendizado contínuo.*\n`;

  fs.writeFileSync(outputFile, explanations, 'utf-8');
}


// Gera um resumo simples da alteração do arquivo
async function getFileChangeSummary(file: string, git: SimpleGit): Promise<string> {
  try {
    const diff = await git.diff([file]);
    if (!diff) return 'Alteração detectada.';
    // Extrai tipo de alteração (adição, modificação, remoção)
    if (/^new file mode/m.test(diff)) return 'Arquivo adicionado.';
    if (/^deleted file mode/m.test(diff)) return 'Arquivo removido.';
    if (/^index/m.test(diff)) return 'Arquivo modificado.';
    return 'Alteração detectada.';
  } catch {
    return 'Alteração detectada.';
  }
}

export async function explainTheme(tema: string, outputFile?: string) {
  // Tenta múltiplos caminhos para o template
  const candidatePaths = [
    path.join(__dirname, '../skills/explain-theme.md'),   // dentro do pacote npm
    path.join(__dirname, '../../skills/explain-theme.md'), // workspace local de dev
  ];

  let content = '';
  let loaded = false;
  for (const templatePath of candidatePaths) {
    try {
      const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
      content = rawTemplate.replace(/\{\{TEMA\}\}/g, tema);
      loaded = true;
      break;
    } catch {
      // tenta o próximo caminho
    }
  }

  if (!loaded) {
    content = `# Aula: ${tema}\n\nOcorreu um erro ao carregar o template. Continue estudando sobre **${tema}**!`;
  }

  // Sempre gera explain-<tema>-<data-hora>.md para evitar sobrescrita
  let file = outputFile;
  if (!file) {
    const temaSlug = tema.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateStr = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    file = `explain-${temaSlug}-${dateStr}.md`;
  }

  // Adiciona seções extras ao final do conteúdo
  content += '\n\n---\n';
  content += `## Exemplo Prático\nDemonstre um caso real ou um trecho de código que ilustre o uso de **${tema}**.\n\n`;
  content += `## Desafio/Reflexão\n- Como você aplicaria **${tema}** no seu contexto?\n- Quais dúvidas ainda restam?\n- Tente criar um mini-projeto ou experimento usando este conceito.\n\n`;
  content += `> *Este material foi gerado automaticamente pelo Learning Agent para promover aprendizado ativo. Compartilhe suas respostas e dúvidas com seu time!*\n`;

  fs.writeFileSync(file, content, 'utf-8');
}

