#!/usr/bin/env node
import { Command } from 'commander';
import { explainChanges, explainTheme } from './main';
import { setupGitHook } from './skills';
import ora from 'ora';
import chalk from 'chalk';

const program = new Command();

program
  .name('learning-agent')
  .description('Explica alterações de código para promover aprendizado e conceitos teóricos')
  .version('0.1.0')
  .option('-o, --output <file>', 'Arquivo de saída markdown', 'explicacoes.md')
  .option('--hook', 'Instala hook post-commit para explicação automática');

program
  .command('explain <tema>')
  .description('Explica um conceito técnico utilizando casos reais da indústria')
  .action(async (tema) => {
    console.log('');
    const spinner = ora(`Preparando aula teórica sobre: ${tema}...`).start();
    try {
      await explainTheme(tema);
      spinner.succeed(chalk.green(`Aula incrível sobre "${tema}" gerada em explicacoes.md! 📚 Bons estudos!`));
    } catch (err: any) {
      spinner.fail(chalk.red(`Falha ao gerar aula: ${err.message}`));
    }
  });

program.action(async (opts) => {
  // If we have top-level options for the hook
  const topOpts = program.opts();
  if (topOpts.hook) {
    await setupGitHook();
    console.log(chalk.green('✔ Hook post-commit instalado com sucesso! A partir de agora, aprenda a cada commit.'));
    return;
  }
  
  // Default behavior (no subcommands provided, just `learning-agent`)
  console.log('');
  const spinner = ora('Analisando as alterações do seu código...').start();
  try {
    await explainChanges(topOpts.output || 'explicacoes.md');
    spinner.succeed(chalk.green(`Explicação detalhada salva com sucesso em ${topOpts.output || 'explicacoes.md'}! 🚀`));
  } catch (err: any) {
    spinner.fail(chalk.yellow(`Aviso: ${err.message}`));
  }
});

program.parse(process.argv);
