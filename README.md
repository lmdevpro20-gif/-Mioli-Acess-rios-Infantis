# Sistema de Controle de Estoque e Vendas - Loja Infantil 🛍️

Um sistema completo e responsivo para gerenciar estoque, entradas e vendas de uma loja infantil, desenvolvido com React, Supabase e Tailwind CSS.

## 🎯 Funcionalidades

### Autenticação
- ✅ Login seguro com email e senha
- ✅ Sessão persistente (mantém usuário logado)
- ✅ Logout

### Gestão de Produtos
- ✅ Cadastro, edição e exclusão de produtos
- ✅ Campos: nome, categoria, tamanho, cor, quantidade, preço de custo e venda
- ✅ Filtros por categoria, tamanho e cor
- ✅ Busca por nome
- ✅ Alerta visual para estoque baixo (< 5 unidades)

### Controle de Estoque
- ✅ Registrar entradas de produtos
- ✅ Histórico de entradas com data e hora
- ✅ Filtro por período

### Gestão de Vendas
- ✅ Registrar vendas com validação de estoque
- ✅ Redução automática de estoque
- ✅ Histórico de vendas detalhado
- ✅ Filtro por período
- ✅ Resumo diário (total itens vendidos e valor)

### Dashboard
- ✅ Total de produtos cadastrados
- ✅ Produtos com estoque baixo
- ✅ Últimas 5 vendas
- ✅ Valor total do estoque
- ✅ Resumo do dia (vendas e faturamento)

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 com Vite
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Estilização**: Tailwind CSS
- **Deploy**: Vercel
- **Ícones**: Lucide React

## 📋 Pré-requisitos

- Node.js 16+ instalado
- Conta no [Supabase](https://supabase.com)
- Conta no [Vercel](https://vercel.com) (para deploy)
- Git instalado

## 🚀 Instalação e Configuração

### 1. Clonar o repositório

```bash
git clone <seu-repositorio>
cd sistema-de-estoque
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar Supabase

#### 3.1 Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em "New Project"
3. Configure:
   - **Name**: Sistema de Estoque
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a mais próxima (Ex: South America - São Paulo)
4. Aguarde a criação (pode levar alguns minutos)

#### 3.2 Obter as credenciais

1. Vá para **Settings** > **API**
2. Copie:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public key** (VITE_SUPABASE_ANON_KEY)

#### 3.3 Criar as tabelas

1. Na seção **SQL Editor**, clique em "New Query"
2. Cole o SQL abaixo e execute:

```sql
-- Tabela de Produtos
CREATE TABLE produtos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(100),
  tamanho VARCHAR(50),
  cor VARCHAR(100),
  quantidade INTEGER DEFAULT 0,
  preco_custo DECIMAL(10, 2) DEFAULT 0,
  preco_venda DECIMAL(10, 2) NOT NULL,
  criado_em TIMESTAMP DEFAULT now(),
  atualizado_em TIMESTAMP DEFAULT now()
);

-- Tabela de Entradas de Estoque
CREATE TABLE entradas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  quantidade INTEGER NOT NULL,
  data TIMESTAMP DEFAULT now()
);

-- Tabela de Vendas
CREATE TABLE vendas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  quantidade INTEGER NOT NULL,
  data TIMESTAMP DEFAULT now()
);

-- Criar índices para melhor performance
CREATE INDEX idx_produtos_categoria ON produtos(categoria);
CREATE INDEX idx_produtos_nome ON produtos(nome);
CREATE INDEX idx_entradas_produto_id ON entradas(produto_id);
CREATE INDEX idx_entradas_data ON entradas(data);
CREATE INDEX idx_vendas_produto_id ON vendas(produto_id);
CREATE INDEX idx_vendas_data ON vendas(data);
```

#### 3.4 Habilitar Row Level Security (RLS)

1. Vá para **Authentication** > **Policies**
2. Para cada tabela (produtos, entradas, vendas):
   - Clique na tabela
   - Habilite RLS
   - Crie as políticas:

**Para tabela `produtos`:**
```sql
-- Política de SELECT (apenas usuários autenticados)
CREATE POLICY "Select produtos - Usuários autenticados"
ON produtos FOR SELECT
USING (auth.role() = 'authenticated');

-- Política de INSERT
CREATE POLICY "Insert produtos - Usuários autenticados"
ON produtos FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Política de UPDATE
CREATE POLICY "Update produtos - Usuários autenticados"
ON produtos FOR UPDATE
USING (auth.role() = 'authenticated');

-- Política de DELETE
CREATE POLICY "Delete produtos - Usuários autenticados"
ON produtos FOR DELETE
USING (auth.role() = 'authenticated');
```

**Para tabela `entradas`:**
```sql
CREATE POLICY "Select entradas - Usuários autenticados"
ON entradas FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Insert entradas - Usuários autenticados"
ON entradas FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Update entradas - Usuários autenticados"
ON entradas FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Delete entradas - Usuários autenticados"
ON entradas FOR DELETE
USING (auth.role() = 'authenticated');
```

**Para tabela `vendas`:**
```sql
CREATE POLICY "Select vendas - Usuários autenticados"
ON vendas FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Insert vendas - Usuários autenticados"
ON vendas FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Update vendas - Usuários autenticados"
ON vendas FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Delete vendas - Usuários autenticados"
ON vendas FOR DELETE
USING (auth.role() = 'authenticated');
```

#### 3.5 Criar funções auxiliares (opcional, para melhor performance)

```sql
-- Função para aumentar estoque
CREATE OR REPLACE FUNCTION aumentar_estoque(p_produto_id UUID, p_quantidade INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE produtos SET quantidade = quantidade + p_quantidade WHERE id = p_produto_id;
END;
$$ LANGUAGE plpgsql;

-- Função para reduzir estoque
CREATE OR REPLACE FUNCTION reduzir_estoque(p_produto_id UUID, p_quantidade INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE produtos SET quantidade = quantidade - p_quantidade WHERE id = p_produto_id;
END;
$$ LANGUAGE plpgsql;
```

#### 3.6 Criar usuário (administrador)

1. Vá para **Authentication** > **Users**
2. Clique em "Invite"
3. Preencha:
   - **Email**: seu@email.com
   - **Role**: admin
4. Você receberá um link de confirmação por email
5. Clique no link e defina a senha

### 4. Configurar variáveis de ambiente

1. Crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.local.example .env.local
```

2. Preencha com suas credenciais do Supabase:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_aqui
```

**⚠️ IMPORTANTE**: Nunca compartilhe essas chaves publicamente. O `.env.local` está no `.gitignore`.

### 5. Rodando localmente

```bash
npm run dev
```

A aplicação abrirá automaticamente em `http://localhost:3000`

## 🔐 Segurança

- ✅ Senhas não são armazenadas no frontend
- ✅ Autenticação gerenciada pelo Supabase Auth
- ✅ Row Level Security (RLS) protege os dados
- ✅ Chaves públicas seguras (anon key)
- ✅ Variáveis sensíveis em `.env.local`

## 📦 Build para Produção

```bash
npm run build
```

A pasta `dist/` contém os arquivos otimizados para produção.

## 🌐 Deploy no Vercel

### 1. Preparar o repositório Git

```bash
git init
git add .
git commit -m "Inicial: Sistema de Estoque"
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório Git
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Clique em "Deploy"

### 3. Configurar domínio (opcional)

1. Na Dashboard do Vercel, vá para **Settings** > **Domains**
2. Adicione seu domínio
3. Configure os DNS records conforme as instruções

## 📝 Notas de Uso

### Primeira Vez
1. Faça login com o email criado no Supabase
2. Vá para **Produtos** > **Novo Produto** para adicionar produtos
3. Em **Estoque**, registre as entradas iniciais
4. Em **Vendas**, registre as vendas conforme ocorrem

### Backup de Dados
1. No Supabase, vá para **Settings** > **Backups**
2. Configure backups automáticos
3. Você também pode exportar dados em CSV

### Monitoramento
- Dashboard mostra overview em tempo real
- Produtos com estoque baixo aparecem com alerta vermelho
- Todos os históricos têm timestamps automáticos

## 🐛 Troubleshooting

### Erro: "Invalid API Key"
- Verifique se as chaves no `.env.local` estão corretas
- Confira se copió a `anon public key` (não a service role key)

### Erro: "Unauthorized"
- Certifique-se de que o RLS está habilitado nas tabelas
- Verifique se as políticas estão criadas corretamente
- Confirme que você está logado

### Estoque não está sendo atualizado
- Verifique se as funções `aumentar_estoque` e `reduzir_estoque` foram criadas
- Confirme que as polítticas de UPDATE estão criadas

## 📞 Suporte

Para problemas, documentação ou suporte:
- [Docs Supabase](https://supabase.com/docs)
- [Docs React](https://react.dev)
- [Docs Tailwind](https://tailwindcss.com/docs)
- [Docs Vercel](https://vercel.com/docs)

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Desenvolvido com ❤️ para gerenciamento eficiente de estoque infantil**
