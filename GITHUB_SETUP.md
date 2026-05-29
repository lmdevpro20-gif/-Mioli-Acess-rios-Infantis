# 🐙 GitHub - Configurar Repositório

Como compartilhar seu código e fazer deploy automático no Vercel.

---

## 🔧 Pré-requisitos

- ✅ Git instalado no seu computador
- ✅ Conta GitHub criada (grátis em https://github.com)
- ✅ Projeto criado e funcionando localmente

---

## 📝 Passo 1: Criar Repositório no GitHub

### No Navegador (Web)

1. Acesse https://github.com
2. Faça login com sua conta
3. Clique no ícone **➕** (canto superior direito)
4. Selecione **"New repository"**
5. Preencha:
   - **Repository name**: `sistema-de-estoque`
   - **Description**: "Sistema de Controle de Estoque e Vendas"
   - **Public** ou **Private** (sua escolha)
   - ✅ "Add a README file" - **NÃO** marque (já temos)
   - ✅ ".gitignore" - **NÃO** marque (já temos)
6. Clique **"Create repository"**

GitHub cria um URL como: `https://github.com/seu-usuario/sistema-de-estoque`

---

## 💻 Passo 2: Inicializar Git Localmente

Abra o **terminal/PowerShell** na pasta do projeto:

```bash
cd "C:\Users\Lori\Desktop\Trabalho\Sistema de estoque"
```

### A. Inicializar Git

```bash
git init
```

Cria pasta `.git/` (oculta).

### B. Adicionar Arquivos

```bash
git add .
```

Adiciona **todos** os arquivos (exceto `.gitignore`).

### C. Primeiro Commit

```bash
git commit -m "Inicial: Sistema de Estoque - projeto completo funcional"
```

Cria o primeiro commit com mensagem.

### D. Renomear Branch (se necessário)

```bash
git branch -M main
```

Renomeia `master` para `main` (padrão GitHub).

### E. Conectar ao Repositório Remoto

```bash
git remote add origin https://github.com/seu-usuario/sistema-de-estoque.git
```

⚠️ **Substituir `seu-usuario` pelo seu usuário GitHub!**

### F. Enviar para GitHub

```bash
git push -u origin main
```

`-u` = tracking upstream (próximos `git push` são automáticos).

---

## ✅ Verificar (No Navegador)

Acesse sua repository no GitHub:
```
https://github.com/seu-usuario/sistema-de-estoque
```

Você deve ver:
- ✅ Todos os arquivos do projeto
- ✅ Documentação (README.md, etc)
- ✅ Pasta `src/`
- ✅ Branch `main` como padrão

---

## 🔄 Após Mudanças (Próximas Vezes)

Quando fizer modificações no código:

```bash
# 1. Ver o que mudou
git status

# 2. Adicionar mudanças
git add .

# 3. Fazer commit
git commit -m "Descrição breve da mudança"

# 4. Enviar para GitHub
git push
```

---

## 🚀 Deploy Automático no Vercel

Depois que estiver no GitHub, deploy é automático!

### Passo 1: Conectar Vercel

1. Acesse https://vercel.com
2. Faça login (pode usar conta GitHub)
3. Clique **"New Project"**
4. Clique **"Import Git Repository"**
5. Selecione sua repository no GitHub
6. Clique **"Import"**

### Passo 2: Configurar Variáveis de Ambiente

Vercel pergunta pelas variáveis:

1. Campo **Environment Variables**
2. Adicione:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: `https://xxx.supabase.co`
3. Clique **"Add"**
4. Adicione novamente:
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: `sua_chave_aqui`
5. Clique **"Add"**

### Passo 3: Deploy

1. Clique **"Deploy"**
2. Vercel começa a build (espere 3-5 min)
3. Quando terminar, você recebe um URL único

**Sua app está online! 🎉**

---

## 🔄 Próximas Mudanças = Deploy Automático

Depois que conectar ao Vercel:

```bash
# Você faz mudança no código localmente
git add .
git commit -m "Fix: corrigir validação"
git push

# ✨ Vercel deteta mudança automaticamente
# ✨ Faz build novamente
# ✨ Deploy acontece sozinho
# ✨ Seu site já está atualizado!
```

**Magia! ✨**

---

## 📱 Seu URL no Vercel

Você receberá algo como:
```
https://sistema-de-estoque.vercel.app
```

Ou pode conectar um domínio customizado (pago ou grátis em .vercel.app).

---

## 🆘 Problemas Comuns

### Erro: "fatal: not a git repository"
**Solução**: Rode `git init` primeiro

### Erro: "Permission denied"
**Solução**: Verifique URL do repositório (copie exatamente de GitHub)

### Erro: "Branch 'main' does not have upstream"
**Solução**: Use `git push -u origin main` (primeira vez)

### Vercel não consegue clonar
**Solução**: Verifique se repositório é público ou você deu permissão

### Build falha no Vercel
**Solução**: 
- Verifique variáveis de ambiente
- Rode `npm run build` localmente para testar
- Veja logs no Vercel Dashboard

---

## 📋 COMANDOS GIT ESSENCIAIS

```bash
# Ver status
git status

# Ver histórico
git log

# Desfazer última mudança (antes de add)
git checkout -- .

# Desfazer último commit (não enviado)
git reset --soft HEAD~1

# Clonar um repositório
git clone https://github.com/usuario/repo.git

# Criar branch nova
git checkout -b nova-feature

# Mudar de branch
git checkout main

# Mesclar branch
git merge nova-feature

# Deletar branch
git branch -d nova-feature

# Puxar mudanças do remoto
git pull
```

---

## 🎓 BOAS PRÁTICAS DE COMMIT

### Mensagens Claras

**✅ BOM**
```
git commit -m "Fix: corrigir validação de estoque"
git commit -m "Feature: adicionar filtro por categoria"
git commit -m "Refactor: limpar código de Dashboard"
```

**❌ RUIM**
```
git commit -m "fix"
git commit -m "mudanças"
git commit -m "xxx"
```

### Padrão de Prefixo

```
feat:      Novo recurso
fix:       Correção de bug
refactor:  Refatoração de código
docs:      Mudança em documentação
style:     Formatação de código
test:      Testes
```

---

## 🔐 SEGURANÇA

### O que NÃO commitar

- ❌ `.env.local` (senhas e chaves)
- ❌ `node_modules/` (dependências)
- ❌ `dist/` (build)
- ❌ Arquivos secretos

**Já está no `.gitignore`? Verifique:**

```bash
# Ver o que vai ser commitado
git status

# Não deve mostrar:
# .env.local
# node_modules/
# dist/
```

---

## 📊 FLUXO COMPLETO

```
┌─────────────────────────────────────┐
│ 1. Mudar código localmente          │
│    npm run dev                      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 2. Testar mudança localmente        │
│    Verificar se funciona            │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 3. Commit local                     │
│    git add .                        │
│    git commit -m "..."              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 4. Push para GitHub                 │
│    git push                         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 5. Vercel deteta mudança            │
│    Faz build automático             │
│    Deploy para produção             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│ 6. ✨ Seu site está atualizado!     │
│    https://seu-site.vercel.app      │
└─────────────────────────────────────┘
```

---

## 🎯 PRÓXIMAS ETAPAS

1. ✅ Criar repositório GitHub (acima)
2. ✅ Inicializar Git localmente (acima)
3. ✅ Conectar ao Vercel (acima)
4. ✅ Seu projeto está online!

---

## 📞 REFERÊNCIAS

- **Git Docs**: https://git-scm.com/doc
- **GitHub Docs**: https://docs.github.com
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Desktop**: Ferramenta visual para Git (grátis)

---

## ✨ PRONTO!

Parabéns! Seu código está online e com deploy automático! 🎉

Agora toda mudança que você fizer será automaticamente publicada.

---

**Sistema de Estoque - Código Compartilhado! 🚀**

_Desenvolvido com ❤️_
