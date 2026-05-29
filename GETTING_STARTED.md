# 🚀 Começando - Guia Rápido

## Passo 1: Configurar Supabase (5 min)

### 1.1 Criar Projeto
1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha:
   - Nome: "Sistema de Estoque"
   - Senha do banco: Algo forte
   - Região: Próxima de você
4. Aguarde criação (3-5 min)

### 1.2 Copiar Credenciais
1. Vá para **Settings → API**
2. Copie **Project URL** e **anon public key**
3. Abra `.env.local` e preencha:
```
VITE_SUPABASE_URL=<cole aqui>
VITE_SUPABASE_ANON_KEY=<cole aqui>
```

### 1.3 Criar Tabelas
1. Em Supabase, vá para **SQL Editor**
2. Clique em "New Query"
3. Cole todo o SQL do arquivo `SETUP_DATABASE.sql`
4. Execute (botão ▶️)

### 1.4 Criar Usuário
1. Vá para **Authentication → Users**
2. Clique "Invite"
3. Preencha seu email
4. Clique no link de confirmação que receber
5. Defina sua senha

## Passo 2: Rodar Localmente (2 min)

```bash
# Se ainda não fez
npm install

# Rodar servidor
npm run dev
```

Abrirá automaticamente em `http://localhost:3000`

**Login com:**
- Email: seu@email.com
- Senha: a que você definiu

## Passo 3: Usar o Sistema

### Primeiro Acesso: Adicionar Produtos

1. Clique em **Produtos** no menu
2. Clique **"Novo Produto"**
3. Preencha:
   - Nome: "Camiseta Infantil"
   - Categoria: "Roupas"
   - Tamanho: "M"
   - Cor: "Azul"
   - Quantidade: "10"
   - Preço Venda: "49.90"
4. Clique **Salvar**

### Registrar Entradas

1. Clique em **Estoque**
2. Selecione o produto
3. Digite a quantidade (ex: 5)
4. Clique **"Registrar Entrada"**

O estoque do produto será aumentado automaticamente ✓

### Registrar Vendas

1. Clique em **Vendas**
2. Selecione o produto
3. Digite a quantidade vendida
4. Veja o resumo (preço total)
5. Clique **"Registrar Venda"**

O estoque será reduzido automaticamente ✓

### Ver Históricos

1. **Estoque → Histórico de Entradas**: Ver todas as entradas com datas
2. **Vendas → Histórico de Vendas**: Ver todas as vendas + faturamento

Você pode filtrar por período!

### Dashboard

1. Clique em **Dashboard** (primeira tela ao logar)
2. Veja resumo geral:
   - Total de produtos
   - Estoque baixo ⚠️
   - Últimas vendas
   - Faturamento do dia

## Passo 4: Deploy no Vercel (3 min)

### 4.1 Preparar Git
```bash
git init
git add .
git commit -m "Sistema de Estoque"
git branch -M main
git remote add origin https://github.com/seu-usuario/repo-name.git
git push -u origin main
```

### 4.2 Deploy
1. Acesse [https://vercel.com](https://vercel.com)
2. Clique "New Project"
3. Selecione seu repositório GitHub
4. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Clique **Deploy**

Pronto! Sua app está online! 🎉

## ⚠️ Alertas Importantes

### Estoque Baixo
- Produtos com quantidade < 5 aparecem com badge **vermelho**
- São listados no Dashboard
- Você será notificado visualmente

### Validações
- ❌ Não permite vender mais do que tem em estoque
- ❌ Não permite quantidade negativa
- ❌ Preço deve ser maior que zero
- ✅ Tudo valida automaticamente

## 🆘 Problemas Comuns

**Erro "Invalid API Key"**
- Verifique se `.env.local` tem as chaves corretas
- Certifique-se que é a `anon public key` (não a service role key)

**Erro "Unauthorized"**
- Confirme que você está logado
- Verifique se as políticas RLS estão criadas no Supabase

**Estoque não atualiza**
- Recarregue a página (F5)
- Verifique se o Supabase está respondendo

## 📚 Próximas Funcionalidades (Futuro)

- [ ] Exportar relatórios em PDF
- [ ] Gráficos de vendas por período
- [ ] Alertas por email de estoque baixo
- [ ] Múltiplos usuários com permissões
- [ ] App mobile (React Native)

## 💡 Dicas

1. **Backup Regular**: Supabase faz backup automático
2. **Melhor Experiência**: Use em navegador desktop para tabelas completas
3. **Mobile**: Funciona perfeitamente em celular também!
4. **Temas**: O sistema tem tema claro adequado para loja infantil

---

**Qualquer dúvida, consulte o README.md para documentação completa!**
