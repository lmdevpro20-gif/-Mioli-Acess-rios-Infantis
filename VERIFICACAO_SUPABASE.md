# ✅ Verificação do Supabase - Checklist

Use este checklist para garantir que tudo está configurado corretamente.

## 📋 Antes de Começar

- [ ] Conta criada em [supabase.com](https://supabase.com)
- [ ] Projeto Supabase criado com sucesso
- [ ] Banco de dados PostgreSQL inicializado

## 🗄️ Banco de Dados

- [ ] Tabela `produtos` criada
  - Verifique: Dashboard → Database → Tables → produtos
  - Colunas esperadas: id, nome, categoria, tamanho, cor, quantidade, preco_custo, preco_venda, criado_em

- [ ] Tabela `entradas` criada
  - Colunas esperadas: id, produto_id, quantidade, data

- [ ] Tabela `vendas` criada
  - Colunas esperadas: id, produto_id, quantidade, data

- [ ] Índices criados (performance)
  - Verifique: SQL Editor → selecione a query de índices e execute

## 🔐 Row Level Security (RLS)

- [ ] RLS habilitado em `produtos`
  - Vá para: Authentication → Policies → produtos
  - Status deve mostrar: "RLS enabled"

- [ ] RLS habilitado em `entradas`
  - Status deve mostrar: "RLS enabled"

- [ ] RLS habilitado em `vendas`
  - Status deve mostrar: "RLS enabled"

## 👥 Usuários e Autenticação

- [ ] Usuário administrativo criado
  - Vá para: Authentication → Users
  - Verifique se seu email está lá com status "Confirmed"

- [ ] Email de confirmação recebido (se registrou via interface)

- [ ] Senha definida com sucesso

## 🔑 Credenciais da API

- [ ] Project URL copiado
  - Formato esperado: `https://xxx.supabase.co`

- [ ] Chave Anon Pública copiada
  - Formato: String longa (não deve conter "secret")

- [ ] `.env.local` preenchido com as credenciais
  - Arquivo contém:
    ```
    VITE_SUPABASE_URL=https://xxx.supabase.co
    VITE_SUPABASE_ANON_KEY=xxxxxx
    ```

- [ ] `.env.local` está no `.gitignore` (não será commitado)

## 🧪 Teste Rápido (no navegador)

Se tudo acima está OK, você pode fazer um teste rápido:

1. [ ] Rode `npm run dev`
2. [ ] Abra http://localhost:3000
3. [ ] Tente fazer login com seu email e senha
4. [ ] Você deve chegar ao Dashboard
5. [ ] Vá para **Produtos** e tente criar um novo produto
6. [ ] Volte ao Supabase e veja se o produto aparece na tabela `produtos`

## 🚨 Problemas Frequentes

### ❌ Erro: "Invalid login credentials"
**Solução:**
- Certifique-se que confirmou o email no Supabase
- A senha está correta (diferenciar maiúsculas)
- Usuário existe em Authentication → Users

### ❌ Erro: "JWT expired" ou "Unauthorized"
**Solução:**
- Recarregue a página (F5)
- Faça logout e login novamente
- Limpe o cache do navegador

### ❌ Erro: "Invalid API Key"
**Solução:**
- Verifique as credenciais no `.env.local`
- Copie novamente de Settings → API
- Certifique-se de que não tem espaços extras

### ❌ Dados não salvam ou erro ao criar produtos
**Solução:**
- Verifique se RLS está habilitado (deve estar)
- Confirme que as políticas RLS foram criadas
- Verifique se você está autenticado (não em modo anônimo)

## ✨ Tudo OK?

Se marcou todos os ✅, seu Supabase está pronto!

Próximo passo: Rodar `npm run dev` e começar a usar o sistema.

---

**Dúvida?** Consulte:
- Documentação Supabase: https://supabase.com/docs
- README.md deste projeto
- GETTING_STARTED.md para guia rápido
