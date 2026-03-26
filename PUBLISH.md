# Publicação do Learning Agent no GitHub e npm

## 1. Subir para o GitHub

1. Crie um repositório público, ex: `joaohenrique/learning-agent`.
2. No terminal, dentro da pasta `learning-agent`:
   ```sh
git init
git remote add origin https://github.com/joaohenrique/learning-agent.git
git add .
git commit -m "release: primeira versão do agente"
git branch -M main
git push -u origin main
```

## 2. Publicar no npm

1. Crie uma conta em https://www.npmjs.com/ se não tiver.
2. No terminal, dentro da pasta `learning-agent`:
   ```sh
npm login
npm publish --access public
```

## 3. Instalar e rodar via npx

```sh
npx learning-agent@latest
```

Pronto! Agora qualquer pessoa pode instalar e rodar seu agente via npx.
