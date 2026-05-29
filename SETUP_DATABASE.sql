-- ============================================
-- SISTEMA DE ESTOQUE - SETUP DO BANCO DE DADOS
-- ============================================
-- Copie e execute este script no SQL Editor do Supabase
-- (Supabase Dashboard → SQL Editor → New Query)

-- ============================================
-- 1. REMOVER TABELAS ANTIGAS (se existirem)
-- ============================================

DROP TABLE IF EXISTS vendas CASCADE;
DROP TABLE IF EXISTS entradas CASCADE;
DROP TABLE IF EXISTS produtos CASCADE;

-- ============================================
-- 2. CRIAR TABELAS
-- ============================================

CREATE TABLE produtos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  quantidade INTEGER DEFAULT 0 CHECK (quantidade >= 0),
  preco_venda DECIMAL(10, 2) NOT NULL CHECK (preco_venda > 0),
  criado_em TIMESTAMP DEFAULT now(),
  atualizado_em TIMESTAMP DEFAULT now()
);

CREATE TABLE entradas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  data TIMESTAMP DEFAULT now()
);

CREATE TABLE vendas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  data TIMESTAMP DEFAULT now()
);

-- ============================================
-- 3. CRIAR ÍNDICES
-- ============================================

CREATE INDEX idx_produtos_nome ON produtos(nome);
CREATE INDEX idx_entradas_produto_id ON entradas(produto_id);
CREATE INDEX idx_entradas_data ON entradas(data);
CREATE INDEX idx_vendas_produto_id ON vendas(produto_id);
CREATE INDEX idx_vendas_data ON vendas(data);

-- ============================================
-- 4. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE entradas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. POLÍTICAS RLS - PRODUTOS
-- ============================================

CREATE POLICY "produtos_select_auth"
ON produtos FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "produtos_insert_auth"
ON produtos FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "produtos_update_auth"
ON produtos FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "produtos_delete_auth"
ON produtos FOR DELETE
USING (auth.role() = 'authenticated');

-- ============================================
-- 6. POLÍTICAS RLS - ENTRADAS
-- ============================================

CREATE POLICY "entradas_select_auth"
ON entradas FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "entradas_insert_auth"
ON entradas FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "entradas_update_auth"
ON entradas FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "entradas_delete_auth"
ON entradas FOR DELETE
USING (auth.role() = 'authenticated');

-- ============================================
-- 7. POLÍTICAS RLS - VENDAS
-- ============================================

CREATE POLICY "vendas_select_auth"
ON vendas FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "vendas_insert_auth"
ON vendas FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vendas_update_auth"
ON vendas FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vendas_delete_auth"
ON vendas FOR DELETE
USING (auth.role() = 'authenticated');

-- ============================================
-- 8. FUNÇÕES AUXILIARES
-- ============================================

CREATE OR REPLACE FUNCTION aumentar_estoque(p_produto_id UUID, p_quantidade INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE produtos
  SET quantidade = quantidade + p_quantidade,
      atualizado_em = now()
  WHERE id = p_produto_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION reduzir_estoque(p_produto_id UUID, p_quantidade INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE produtos
  SET quantidade = quantidade - p_quantidade,
      atualizado_em = now()
  WHERE id = p_produto_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- FIM DO SETUP
-- ============================================
-- Banco pronto! Agora crie um usuário em:
-- Authentication → Users → Add user
