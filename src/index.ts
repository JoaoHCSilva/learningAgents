#!/usr/bin/env node
import { Command } from 'commander';
import { explainChanges } from './main';
import { setupGitHook } from './skills';

const program = new Command();


program
  .name('learning-agent')
  .description('Explica alterações de código para promover aprendizado')
  .version('0.1.0')
  .option('-o, --output <file>', 'Arquivo de saída markdown', 'explicacao-alteracoes.md')
  .option('--hook', 'Instala hook post-commit para explicação automática')
  .action(async (opts) => {
    if (opts.hook) {
      await setupGitHook();
      console.log('Hook post-commit instalado com sucesso!');
      return;
    }
    await explainChanges(opts.output);
  });

program.parse(process.argv);
