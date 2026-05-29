# 👤 Guia do Usuário - Sistema de Estoque

## 📖 Bem-vindo!

Este é seu guia completo para usar o Sistema de Controle de Estoque e Vendas. Aqui você aprenderá cada funcionalidade passo a passo.

---

## 🔐 1. Fazer Login

### Primeira Vez

1. Abra a aplicação (http://localhost:3000 ou seu domínio)
2. Você verá a tela de login com:
   - Campo **Email**: Digite seu email cadastrado no Supabase
   - Campo **Senha**: Digite sua senha
3. Clique no botão **"Entrar"**
4. Se os dados estiverem corretos, você chegará ao **Dashboard**

### Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| "Email ou senha inválidos" | Dados errados | Verifique digitação (maiúsculas, espaços) |
| Campo desabilitado | Carregando | Aguarde 3 segundos |
| Página em branco | Sessão expirada | Recarregue a página (F5) |

### Manter Logado

✅ A aplicação **mantém você logado automaticamente** (sessão persistente)

Mesmo se fechar o navegador, sua sessão continuará ativa por segurança.

---

## 🏠 2. Dashboard (Tela Inicial)

Ao fazer login, você chega ao **Dashboard**, que é seu resumo visual do negócio.

### O Que Você Vê

#### Seção Superior - Cards Principais (4 cards)

1. **Total de Produtos**
   - Mostra quantos produtos você cadastrou
   - Exemplo: "12 produtos"
   - Clique em **"Produtos"** no menu para gerenciar

2. **Valor do Estoque**
   - Valor total em reais de tudo que você tem em estoque
   - Cálculo: Quantidade × Preço de Venda de cada produto
   - Exemplo: "R$ 5.234,50"

3. **Vendas do Dia**
   - Quantas unidades foram vendidas hoje
   - Mostra também quantas transações (vendas)
   - Exemplo: "8 itens" (3 transações)

4. **Faturamento do Dia**
   - Total em reais arrecadado hoje
   - Exemplo: "R$ 1.250,00"

#### Seção Inferior - Alertas e Resumos (2 cards)

**À Esquerda: Produtos com Estoque Baixo**
- ⚠️ Mostra produtos com menos de 5 unidades
- Cada produto mostra:
  - Nome do produto
  - Categoria
  - Quantidade atual em **vermelho**
- Se nenhum produto tiver estoque baixo, mostra: "Nenhum produto com estoque baixo. Tudo certo! ✓"

**À Direita: Últimas 5 Vendas**
- Mostra as 5 últimas vendas realizadas
- Cada venda mostra:
  - Nome do produto
  - Data da venda
  - Quantidade vendida
  - Valor total

### Ações no Dashboard

- **"Atualizar Dados"**: Recarrega todos os números em tempo real
- **Menu Lateral**: Navegue para outras seções

---

## 📦 3. Menu Lateral

O **menu lateral esquerdo** é sua barra de navegação. Em mobile, ele aparece em cima.

### Opções do Menu

```
🛍️ Estoque Infantil    (Título/Logo)
────────────────────────────
📊 Dashboard          (Ir para resumo)
📦 Produtos           (Gerenciar produtos)
📥 Estoque            (Registrar entradas)
🛒 Vendas             (Registrar vendas)
────────────────────────────
🚪 Sair               (Fazer logout)
```

### Como Usar

1. **Clique em qualquer opção** para ir para aquela seção
2. **Menu colapsível em mobile**: Toque o ícone ☰ no topo
3. **Sair**: Botão vermelho na base do menu (faz logout)

---

## 🛍️ 4. Produtos - Gerenciar Seu Catálogo

### Acessar: Menu → **Produtos**

Esta é sua tela de **gerenciamento completo de produtos**.

### Seção de Filtros

A primeira coisa que você vê é a seção de **filtros** com 5 campos:

1. **Buscar por nome...** (campo texto)
   - Exemplo: Digite "camiseta" para encontrar camisetas
   - Filtra em tempo real conforme digita

2. **Categoria** (dropdown)
   - Opções aparecem automaticamente
   - Exemplos: Roupas, Calçados, Acessórios, Brinquedos, Livros
   - Deixe em branco para ver todas

3. **Tamanho** (dropdown)
   - Exemplos: P, M, G, GG, Único
   - Deixe em branco para todos os tamanhos

4. **Cor** (dropdown)
   - Exemplos: Azul, Rosa, Verde, Branco
   - Deixe em branco para todas as cores

5. **Limpar Filtros** (botão)
   - Reseta todos os filtros de uma vez

### Tabela de Produtos

Depois dos filtros, você vê uma **tabela com todos os seus produtos**:

#### Colunas da Tabela

| Coluna | O Que Mostra |
|--------|-------------|
| **Produto** | Nome do produto |
| **Categoria** | Tipo (Roupas, Brinquedos, etc) |
| **Tamanho / Cor** | Tamanho e cor do produto |
| **Quantidade** | Unidades em estoque (com ⚠️ se baixo) |
| **Preço Venda** | Valor unitário em reais |
| **Total** | Quantidade × Preço = Valor total |
| **Ações** | Editar (✏️) ou Deletar (🗑️) |

#### Ícones de Alerta

📊 **Estoque Baixo**: Se a quantidade for < 5, aparece um badge vermelho: "⚠️ Estoque baixo"

### Criar um Novo Produto

1. Clique no botão **"➕ Novo Produto"** (canto superior direito)
2. Um modal (janela) se abre com um formulário
3. Preencha os campos:
   - ⭐ **Nome**: Obrigatório (ex: "Camiseta Infantil")
   - ⭐ **Categoria**: Obrigatório (ex: "Roupas")
   - **Tamanho**: Opcional (ex: "M")
   - **Cor**: Opcional (ex: "Azul")
   - ⭐ **Quantidade**: Obrigatório (ex: "10")
   - **Preço Custo**: Opcional (ex: "15.00") - para suas notas
   - ⭐ **Preço Venda**: Obrigatório (ex: "49.90")
4. Clique **"Salvar"**
5. Mensagem de sucesso aparece: "✓ Produto salvo com sucesso!"

### Editar um Produto

1. Na tabela, encontre o produto
2. Clique no ícone **✏️ (Editar)**
3. O modal se abre com os dados preenchidos
4. Altere o que precisar
5. Clique **"Salvar"**

### Deletar um Produto

1. Na tabela, encontre o produto
2. Clique no ícone **🗑️ (Deletar)**
3. Uma confirmação aparece: "Tem certeza que deseja deletar XYZ?"
4. Clique **OK** para confirmar
5. Produto é removido do sistema ✓

---

## 📥 5. Estoque - Registrar Entradas

### Acessar: Menu → **Estoque**

Aqui você registra quando **reposição de estoque chega** (compra de produtos).

### Como Registrar Entrada

1. **Selecione o Produto** (dropdown)
   - Clique no campo
   - Aparece lista de todos seus produtos
   - Selecione o produto que recebeu

2. **Veja Detalhes do Produto** (aparece automaticamente)
   - Categoria
   - Estoque Atual
   - Tamanho (se houver)
   - Cor (se houver)

3. **Digite a Quantidade**
   - Campo: "Quantidade de Entrada"
   - Exemplo: "5" (você recebeu 5 unidades)

4. **Clique "📦 Registrar Entrada"**

5. **Confirmação**: Mensagem verde aparece
   - "✓ Entrada registrada com sucesso!"

✅ **O estoque do produto foi aumentado automaticamente!**

### Exemplo Prático

- Você tinha: 10 unidades de Camiseta Azul
- Você registra entrada: +5 unidades
- Novo estoque: 15 unidades ✓

---

## 🛒 6. Vendas - Registrar Transações

### Acessar: Menu → **Vendas**

Aqui você registra **quando vende um produto** para um cliente.

### Como Registrar Venda

1. **Selecione o Produto** (dropdown)
   - Clique no campo
   - Aparece lista de todos seus produtos com estoque disponível
   - Selecione o produto vendido

2. **Veja Detalhes** (aparece automaticamente)
   - Categoria
   - Preço Unitário
   - Tamanho e Cor
   - **Estoque Disponível** (em verde ou vermelho se baixo)

3. **Digite a Quantidade Vendida**
   - Campo: "Quantidade de Venda"
   - Máximo permitido = quantidade em estoque

4. **Veja o Resumo da Venda** (aparece automaticamente)
   - Quantidade × Preço Unitário
   - **Valor Total** em grande (em roxo)

5. **Clique "🛒 Registrar Venda"**

6. **Confirmação**: Mensagem verde aparece
   - "✓ Venda registrada com sucesso!"

✅ **O estoque do produto foi reduzido automaticamente!**

### ⚠️ Validações

- ❌ Você **não pode vender** mais do que tem em estoque
  - Sistema bloqueia e mostra erro em vermelho
- ❌ Quantidade deve ser maior que zero
- ✅ Cálculo de total é automático

### Exemplo Prático

- Você tinha: 10 unidades de Camiseta Azul
- Você registra venda: 2 unidades a R$ 49,90
- Novo estoque: 8 unidades ✓
- Valor da venda: R$ 99,80 ✓

---

## 📊 7. Históricos - Ver Transações Passadas

### 📥 Histórico de Entradas

#### Acessar: Menu → **Estoque** → **Ver Histórico** (ou botão)

Mostra **todas as entradas de estoque** que você registrou.

**Filtros Disponíveis:**
- Data Inicial
- Data Final
- Botão "Limpar Filtros"

**Tabela mostra:**
- Data e Hora da entrada
- Nome do produto
- Categoria
- Quantidade adicionada (em verde com +)

### 🛒 Histórico de Vendas

#### Acessar: Menu → **Vendas** → **Histórico** (ou botão)

Mostra **todas as vendas** que você registrou.

**Filtros Disponíveis:**
- Data Inicial
- Data Final
- Botão "Limpar Filtros"

**Cards Resumo:**
- Vendas do Dia (total de itens)
- Faturamento do Dia
- Total Filtrado (suma dos filtros aplicados)

**Tabela mostra:**
- Data e Hora da venda
- Nome do produto
- Quantidade vendida
- Preço Unitário
- Valor Total

**Total Final**: Na última linha, soma de todas as vendas

---

## 📅 8. Usando Filtros por Data

### Por Que Filtrar?

Você quer ver apenas transações de um período específico:
- "Quero ver vendas de janeiro"
- "Quanto faturei entre 01/05 e 15/05?"

### Como Usar

1. **Vá para Histórico** (Estoque ou Vendas)
2. **Seção de Filtros** aparece no topo
3. Preencha:
   - **Data Inicial**: Clique e selecione a data inicial
   - **Data Final**: Clique e selecione a data final
4. **Tabela atualiza automaticamente** mostrando só esse período
5. **Clique "Limpar Filtros"** para ver tudo novamente

### Exemplo

- Quero vendas de 01/05/2024 a 10/05/2024
- Coloco: Data Inicial = 01/05/2024, Data Final = 10/05/2024
- Tabela mostra só vendas desse período
- Total mostra soma desse período

---

## 🚪 9. Fazer Logout (Sair)

### Como Sair da Aplicação

1. Olhe para o **menu lateral esquerdo**
2. Na base, clique no botão **"🚪 Sair"** (vermelho)
3. Você é desconectado automaticamente
4. Volta para tela de **Login**

### Importante

- ✅ Sua sessão é **salva automaticamente**
- ✅ Você pode voltar a qualquer momento
- ✅ Todos os dados estão seguros no Supabase
- ❌ NÃO feche o navegador sem salvar as transações

---

## 💡 Dicas e Truques

### 📱 Em Mobile

- Menu lateral fica em cima (com ícone ☰)
- Tabelas ficam menores mas funcionam igual
- Toque os filtros para expandir/colapsar

### 🔄 Dados em Tempo Real

- Dashboard atualiza automaticamente
- Clique "Atualizar Dados" para forçar refresh
- Cada ação salva imediatamente

### 🎨 Tema

- Sistema usa cores **suaves adequadas para loja infantil**
- Tema claro (fundo branco) - fácil para os olhos
- Cores: Azul, Rosa, Verde pastel

### ⌨️ Atalhos

- **F5**: Recarrega a página
- **Tab**: Navega entre campos
- **Enter**: Submete formulários

---

## 🆘 Problemas Frequentes

### Erro: "Estoque insuficiente"
**Solução**: Registre uma entrada primeiro para ter quantidade

### Erro: "Produto não encontrado"
**Solução**: Crie o produto em Produtos → Novo Produto

### Erro: "Não consegui conectar ao servidor"
**Solução**: Verifique conexão de internet ou Supabase

### Números não atualizam
**Solução**: Clique "Atualizar Dados" ou recarregue a página (F5)

### Login não funciona
**Solução**: Verifique email e senha (diferenciam maiúsculas)

---

## 📞 Suporte

Se tiver problemas:
1. Consulte este guia novamente
2. Veja o arquivo `README.md` para detalhes técnicos
3. Verifique `GETTING_STARTED.md` para configuração
4. Veja `VERIFICACAO_SUPABASE.md` para problemas de banco

---

**🎉 Parabéns! Você já sabe usar o sistema!**

Agora comece a registrar seus produtos, entradas e vendas.

Boa sorte com sua loja infantil! 👶🎀
