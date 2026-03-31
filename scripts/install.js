#!/usr/bin/env node

/**
 * Learning Agent — Script de instalação (postinstall)
 *
 * Copia automaticamente os skills e configurações para o projeto do usuário
 * quando ele roda `npm install learning-agent`.
 */

const fs = require('fs');
const path = require('path');

// INIT_CWD é o diretório onde o usuário rodou `npm install`
const projectRoot = process.env.INIT_CWD || process.cwd();
const packageRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(packageRoot, 'assets');

// Detectar se é install global (não tem INIT_CWD definido ou é o próprio pacote)
const isGlobal = !process.env.INIT_CWD ||
  path.resolve(process.env.INIT_CWD) === path.resolve(packageRoot);

if (isGlobal) {
  console.log('');
  console.log('🎓 Learning Agent instalado globalmente!');
  console.log('   Para configurar em um projeto, rode:');
  console.log('   $ learning-agent init');
  console.log('');
  process.exit(0);
}

// --- Instalação local: copiar assets para o projeto ---

const FORCE = process.argv.includes('--force');

/**
 * Copia diretório recursivamente.
 * Se overwrite=false, não sobrescreve arquivos existentes.
 */
function copyDirSync(src, dest, overwrite = false) {
  if (!fs.existsSync(src)) return;
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

console.log('');
console.log('🎓 Learning Agent — Configurando skills...');
console.log('');

// 1. Copiar skills para .agents/skills/
const skillsSrc = path.join(assetsDir, 'skills');
const skillsDest = path.join(projectRoot, '.agents', 'skills');
const skippedSkills = copyDirSync(skillsSrc, skillsDest, FORCE);

if (skippedSkills.length > 0) {
  console.log('   ⚠️  Skills existentes mantidos (use --force para sobrescrever):');
  skippedSkills.forEach(f => console.log(`      - ${path.relative(projectRoot, f)}`));
} else {
  console.log('   ✅ Skills instalados em .agents/skills/');
}

// 2. Copiar copilot-instructions.md para .github/
const copilotSrc = path.join(assetsDir, 'copilot-instructions.md');
const githubDir = path.join(projectRoot, '.github');
const copilotDest = path.join(githubDir, 'copilot-instructions.md');

if (!fs.existsSync(githubDir)) {
  fs.mkdirSync(githubDir, { recursive: true });
}

if (!FORCE && fs.existsSync(copilotDest)) {
  console.log('   ⚠️  .github/copilot-instructions.md já existe (use --force para sobrescrever)');
} else {
  fs.copyFileSync(copilotSrc, copilotDest);
  console.log('   ✅ Copilot instructions instalado em .github/');
}

// 3. Criar diretório explicacoes/
const explicacoesDir = path.join(projectRoot, 'explicacoes');
if (!fs.existsSync(explicacoesDir)) {
  fs.mkdirSync(explicacoesDir, { recursive: true });
  // Criar .gitkeep
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
