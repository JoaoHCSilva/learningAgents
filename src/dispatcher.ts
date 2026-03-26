// Dispatcher para comandos /la-* (Copilot/Antigravity Skill)
import { explainTheme, explainChanges } from './main';
import * as fs from 'fs';
import * as path from 'path';

// Utilitário para gerar nome de arquivo markdown
function getExplainFilename(context: string) {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const dateStr = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}`;
  if (context && context.length < 32) {
    // slugify tema/contexto
    const tema = context.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `explain-${tema}.md`;
  }
  return `explain-${dateStr}.md`;
}

// Função principal do dispatcher
export async function dispatchSkill(command: string, context: string) {
  if (command === '/la-explain') {
    const filename = getExplainFilename(context);
    await explainTheme(context, filename);
    return filename;
  }
  if (command === '/la-review') {
    const filename = getExplainFilename('review');
    await explainChanges(filename);
    return filename;
  }
  throw new Error('Comando não reconhecido. Use /la-explain <tema> ou /la-review.');
}