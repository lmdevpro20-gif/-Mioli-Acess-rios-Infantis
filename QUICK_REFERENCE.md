# ⚡ Quick Reference - Guia Rápido

Cole este na sua mesa! Use como referência rápida.

---

## 🚀 INICIAR

```bash
npm install           # Instalar dependências
npm run dev          # Rodar localmente
npm run build        # Build para produção
```

**URL Local**: http://localhost:3000

---

## 🔐 LOGIN

| Campo | Valor |
|-------|-------|
| **Email** | seu@email.com |
| **Senha** | Definida no Supabase |

---

## 🧭 NAVEGAÇÃO

```
Dashboard      → Menu → 📊 Dashboard
Produtos       → Menu → 📦 Produtos
Estoque        → Menu → 📥 Estoque
Vendas         → Menu → 🛒 Vendas
Sair (Logout)  → Menu → 🚪 Sair (botão vermelho)
```

---

## 📦 PRODUTOS - Operações Rápidas

### Criar
1. Menu → Produtos
2. "➕ Novo Produto"
3. Preencha formulário
4. "Salvar"

### Editar
1. Encontre na tabela
2. Clique ✏️ (Editar)
3. Altere dados
4. "Salvar"

### Deletar
1. Encontre na tabela
2. Clique 🗑️ (Deletar)
3. Confirme

### Filtrar
- **Busca**: Nome do produto
- **Categoria**: Dropdown
- **Tamanho**: Dropdown
- **Cor**: Dropdown
- **Limpar**: Reseta filtros

---

## 📥 ESTOQUE - Dar Entrada

1. Menu → Estoque
2. Selecione produto
3. Digite quantidade
4. Clique "Registrar Entrada"

**Resultado**: Estoque aumentado automaticamente ✓

---

## 🛒 VENDAS - Registrar Venda

1. Menu → Vendas
2. Selecione produto
3. Digite quantidade
4. Veja total (automático)
5. Clique "Registrar Venda"

**Validação**: Não permite vender > estoque

**Resultado**: Estoque reduzido automaticamente ✓

---

## 📊 DASHBOARD - Resumo

| Widget | Mostra |
|--------|--------|
| Total Produtos | Quantos produtos cadastrados |
| Valor Estoque | Valor total em reais |
| Vendas Dia | Itens vendidos hoje |
| Faturamento | Total arrecadado hoje |
| Estoque Baixo | Produtos < 5 unidades ⚠️ |
| Últimas Vendas | 5 últimas transações |

---

## 📅 HISTÓRICOS

### Entrada de Estoque
- Menu → Estoque → Histórico
- Filtrar por: Data Inicial / Final
- Mostra: Data/Hora, Produto, Categoria, Quantidade

### Vendas
- Menu → Vendas → Histórico
- Filtrar por: Data Inicial / Final
- Mostra: Resumo do dia + Tabela completa
- Total: Soma de todas as vendas

---

## ⚠️ VALIDAÇÕES

| Regra | Bloqueio |
|------|----------|
| Vender > estoque | ❌ SIM |
| Quantidade ≤ 0 | ❌ SIM |
| Preço ≤ 0 | ❌ SIM |
| Campos obrigatórios | ❌ SIM |

---

## 📱 MOBILE vs DESKTOP

| Recurso | Mobile | Desktop |
|---------|--------|---------|
| Menu | Colapsível (☰) | Lateral fixo |
| Tabelas | Rolável | Completa |
| Filtros | Stack | Lado a lado |
| Cards | 1 coluna | 4 colunas |

---

## 🎨 TEMAS & CORES

```
Fundo:     Branco (#f9f9f9)
Principal: Roxo Infantil (#a366ff)
Sucesso:   Verde Pastel
Erro:      Vermelho (#ef4444)
Aviso:     Amarelo/Laranja
```

---

## 🔧 VARIÁVEIS DE AMBIENTE

Arquivo: `.env.local`

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxx
```

⚠️ **Não commitar este arquivo!**

---

## 📊 BANCO DE DADOS - Tabelas

### produtos
```sql
id, nome, categoria, tamanho, cor,
quantidade, preco_custo, preco_venda,
criado_em, atualizado_em
```

### entradas
```sql
id, produto_id, quantidade, data
```

### vendas
```sql
id, produto_id, quantidade, data
```

---

## 🌐 DEPLOY NO VERCEL

```bash
# 1. Git
git init
git add .
git commit -m "Inicial"
git push

# 2. Vercel
- Conectar GitHub
- Adicionar variáveis de ambiente
- Deploy automático ✨
```

---

## 🆘 ERROS RÁPIDOS

| Erro | Causa | Solução |
|------|-------|---------|
| Invalid API Key | Credenciais erradas | Verifique `.env.local` |
| Unauthorized | Não autenticado | Faça login |
| Estoque insuficiente | Tentou vender > estoque | Registre entrada primeiro |
| Produto não encontrado | Produto deletado | Crie novo produto |

---

## 📚 DOCUMENTAÇÃO

| Arquivo | Para |
|---------|------|
| `README.md` | Documentação completa |
| `GETTING_STARTED.md` | Guia rápido setup |
| `GUIA_USUARIO.md` | Como usar o sistema |
| `SETUP_DATABASE.sql` | Script SQL Supabase |
| `VERIFICACAO_SUPABASE.md` | Checklist setup |

---

## ⌨️ ATALHOS

| Ação | Tecla |
|------|-------|
| Recarregar | F5 |
| Navegar campos | Tab |
| Submeter form | Enter |
| Voltar | Alt + ← |

---

## 📞 CONTATOS ÚTEIS

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com
- **Vercel Docs**: https://vercel.com/docs

---

## ✅ CHECKLIST PRÉ-DEPLOY

- [ ] `.env.local` preenchido
- [ ] Supabase RLS habilitado
- [ ] Usuário criado
- [ ] Teste de login OK
- [ ] Dashboard carregando
- [ ] Criar produto = OK
- [ ] Registrar venda = OK
- [ ] Build sem erros: `npm run build`

---

## 🎯 PRINCIPAIS FUNCIONALIDADES

✅ Autenticação com email/senha  
✅ CRUD completo de produtos  
✅ Entrada de estoque com histórico  
✅ Registro de vendas com validação  
✅ Dashboard em tempo real  
✅ Filtros por data/categoria/tamanho/cor  
✅ Responsivo (mobile/tablet/desktop)  
✅ Tema infantil com cores suaves  
✅ Mensagens de erro amigáveis  
✅ Row Level Security (RLS)  

---

## 💰 FÓRMULAS USADAS

```
Valor Total Estoque = Σ(Quantidade × Preço Venda)
Valor Venda = Quantidade × Preço Unitário
Margem Lucro = ((Preço Venda - Preço Custo) / Preço Venda) × 100
Resumo Dia = Σ(Vendas) do dia (00:00 - 23:59)
```

---

## 🚀 PERFORMANCE

- **Vite**: Build rápido (~1.5s)
- **React**: Hot reload em desenvolvimento
- **Tailwind**: CSS otimizado para produção
- **Supabase**: Índices para queries rápidas
- **Deploy**: Vercel ~50ms TTFB (Time To First Byte)

---

**Salve este arquivo como referência! 📌**

---

_Última atualização: 2024-05-29_  
_Versão: 1.0_
