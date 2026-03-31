#!/usr/bin/env node

/**
 * Learning Agent — CLI
 *
 * Comandos:
 *   learning-agent init          Configura skills no projeto atual
 *   learning-agent init --force  Sobrescreve skills existentes
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (command === 'init') {
  init(args.includes('--force'));
} else {
  console.error(`❌ Comando desconhecido: "${command}"`);
  console.error('   Use "learning-agent --help" para ver os comandos disponíveis.');
  process.exit(1);
}

function printHelp() {
  console.log('');
  console.log('🎓 Learning Agent — Professor de Engenharia de Software no VSCode');
  console.log('');
  console.log('Uso:');
  console.log('  learning-agent init           Configura skills no projeto atual');
  console.log('  learning-agent init --force   Sobrescreve skills existentes');
  console.log('  learning-agent --help         Mostra esta ajuda');
  console.log('');
  console.log('Após configurar, use no chat do VSCode:');
  console.log('  /la-explain <tema>    Explicação didática sobre um tema');
  console.log('  /la-review            Revisão didática das alterações recentes');
  console.log('  /la-file <arquivo>    Análise didática de um arquivo');
  console.log('');
}

/**
 * Copia diretório recursivamente.
 */
function copyDirSync(src, dest, overwrite = false) {
  if (!fs.existsSync(src)) return [];
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  const skipped = [];

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      const subSkipped = copyDirSync(srcPath, destPath, overwrite);
      skipped.push(...subSkipped);
    } else {
      if (!overwrite && fs.existsSync(destPath)) {
        skipped.push(destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  return skipped;
}

function init(force) {
  const projectRoot = process.cwd();

  // Encontrar o diretório de assets do pacote
  let assetsDir;

  // Tenta encontrar dentro do node_modules
  const localAssets = path.join(projectRoot, 'node_modules', 'learning-agent', 'assets');
  // Tenta encontrar relativo ao próprio CLI (install global)
  const globalAssets = path.join(__dirname, '..', 'assets');

  if (fs.existsSync(localAssets)) {
    assetsDir = localAssets;
  } else if (fs.existsSync(globalAssets)) {
    assetsDir = globalAssets;
  } else {
    console.error('❌ Não foi possível encontrar os assets do Learning Agent.');
    console.error('   Certifique-se de que o pacote está instalado corretamente.');
    process.exit(1);
  }

  console.log('');
  console.log('🎓 Learning Agent — Configurando skills...');
  console.log(`   Projeto: ${projectRoot}`);
  console.log('');

  // 1. Copiar skills
  const skillsSrc = path.join(assetsDir, 'skills');
  const skillsDest = path.join(projectRoot, '.agents', 'skills');
  const skippedSkills = copyDirSync(skillsSrc, skillsDest, force);

  if (skippedSkills.length > 0) {
    console.log('   ⚠️  Skills existentes mantidos (use --force para sobrescrever):');
    skippedSkills.forEach(f => console.log(`      - ${path.relative(projectRoot, f)}`));
  } else {
    console.log('   ✅ Skills instalados em .agents/skills/');
  }

  // 2. Copiar copilot-instructions
  const copilotSrc = path.join(assetsDir, 'copilot-instructions.md');
  const githubDir = path.join(projectRoot, '.github');
  const copilotDest = path.join(githubDir, 'copilot-instructions.md');

  if (!fs.existsSync(githubDir)) {
    fs.mkdirSync(githubDir, { recursive: true });
  }

  if (!force && fs.existsSync(copilotDest)) {
    console.log('   ⚠️  .github/copilot-instructions.md já existe (use --force para sobrescrever)');
  } else {
    fs.copyFileSync(copilotSrc, copilotDest);
    console.log('   ✅ Copilot instructions instalado em .github/');
  }

  // 3. Criar diretório explicacoes/
  const explicacoesDir = path.join(projectRoot, 'explicacoes');
  if (!fs.existsSync(explicacoesDir)) {
    fs.mkdirSync(explicacoesDir, { recursive: true });
    fs.writeFileSync(path.join(explicacoesDir, '.gitkeep'), '', 'utf-8');
    console.log('   ✅ Diretório explicacoes/ criado');
  } else {
    console.log('   ℹ️  Diretório explicacoes/ já existe');
  }

  // 4. Mensagem final
  console.log('');
  console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   🎓 Learning Agent pronto!');
  console.log('');
  console.log('   Comandos disponíveis no chat do VSCode:');
  console.log('     /la-explain <tema>    — Explicação didática');
  console.log('     /la-review            — Revisão de alterações');
  console.log('     /la-file <arquivo>    — Análise de arquivo');
  console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}
