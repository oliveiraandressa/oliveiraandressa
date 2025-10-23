# Casos de Teste - Sistema de E-commerce

## TC-001: Login com Credenciais Válidas

**Módulo:** Autenticação  
**Prioridade:** Alta  
**Tipo:** Funcional  
**Autor:** Andressa Oliveira  
**Data:** 15/01/2024

### Objetivo
Verificar se o usuário consegue fazer login com credenciais válidas.

### Pré-condições
- Usuário cadastrado no sistema
- Email: `usuario@teste.com`
- Senha: `Senha@123`
- Aplicação acessível

### Passos de Execução

| # | Ação | Resultado Esperado |
|---|------|-------------------|
| 1 | Acessar a página de login (https://exemplo.com/login) | Página de login é exibida |
| 2 | Inserir email válido no campo "Email" | Email é inserido corretamente |
| 3 | Inserir senha válida no campo "Senha" | Senha é inserida (caracteres ocultos) |
| 4 | Clicar no botão "Entrar" | Sistema processa a requisição |
| 5 | - | Usuário é redirecionado para o dashboard |
| 6 | - | Mensagem de boas-vindas é exibida |
| 7 | - | Menu do usuário está visível |

### Resultado Esperado
- Login realizado com sucesso
- Redirecionamento para `/dashboard`
- Exibição de "Bem-vindo, [Nome do Usuário]"
- Token de autenticação armazenado

### Dados de Teste
```json
{
  "email": "usuario@teste.com",
  "senha": "Senha@123"
}
```

### Evidências
- Screenshot da página de login preenchida
- Screenshot do dashboard após login
- Log de requisição/resposta da API

---

## TC-002: Login com Senha Inválida

**Módulo:** Autenticação  
**Prioridade:** Alta  
**Tipo:** Negativo  
**Autor:** Andressa Oliveira  
**Data:** 15/01/2024

### Objetivo
Verificar se o sistema exibe mensagem de erro ao tentar login com senha incorreta.

### Pré-condições
- Usuário cadastrado no sistema
- Email válido: `usuario@teste.com`

### Passos de Execução

| # | Ação | Resultado Esperado |
|---|------|-------------------|
| 1 | Acessar a página de login | Página de login é exibida |
| 2 | Inserir email válido | Email inserido corretamente |
| 3 | Inserir senha inválida: `SenhaErrada123` | Senha inserida (oculta) |
| 4 | Clicar no botão "Entrar" | Sistema processa requisição |
| 5 | - | Mensagem de erro é exibida |
| 6 | - | Usuário permanece na página de login |
| 7 | - | Campos não são limpos |

### Resultado Esperado
- Exibição de mensagem: "Email ou senha incorretos"
- Status HTTP 401 (Unauthorized)
- Usuário permanece na página de login
- Nenhum token é gerado

### Dados de Teste
```json
{
  "email": "usuario@teste.com",
  "senha": "SenhaErrada123"
}
```

---

## TC-003: Adicionar Produto ao Carrinho

**Módulo:** Carrinho de Compras  
**Prioridade:** Alta  
**Tipo:** Funcional  
**Autor:** Andressa Oliveira  
**Data:** 15/01/2024

### Objetivo
Validar a adição de produto ao carrinho de compras.

### Pré-condições
- Usuário autenticado no sistema
- Produto disponível em estoque (ID: 123, Nome: "Notebook Dell")
- Carrinho vazio inicialmente

### Passos de Execução

| # | Ação | Resultado Esperado |
|---|------|-------------------|
| 1 | Acessar a página de produtos | Lista de produtos é exibida |
| 2 | Localizar produto "Notebook Dell" | Produto é visível na lista |
| 3 | Clicar em "Ver Detalhes" | Página de detalhes é aberta |
| 4 | Verificar preço e disponibilidade | Preço: R$ 2.999,00 / Estoque: Disponível |
| 5 | Selecionar quantidade: 1 | Quantidade selecionada |
| 6 | Clicar em "Adicionar ao Carrinho" | Produto adicionado ao carrinho |
| 7 | - | Mensagem de sucesso exibida |
| 8 | - | Ícone do carrinho mostra badge "1" |
| 9 | Clicar no ícone do carrinho | Carrinho é aberto |
| 10 | - | Produto aparece no carrinho |
| 11 | - | Subtotal correto: R$ 2.999,00 |

### Resultado Esperado
- Produto adicionado com sucesso
- Contador do carrinho atualizado
- Subtotal calculado corretamente
- Persistência ao atualizar a página

### Dados de Teste
```json
{
  "produtoId": 123,
  "nome": "Notebook Dell",
  "preco": 2999.00,
  "quantidade": 1
}
```

---

## TC-004: Finalizar Compra com Sucesso

**Módulo:** Checkout  
**Prioridade:** Crítica  
**Tipo:** End-to-End  
**Autor:** Andressa Oliveira  
**Data:** 15/01/2024

### Objetivo
Validar o fluxo completo de checkout desde o carrinho até a confirmação do pedido.

### Pré-condições
- Usuário autenticado
- Produto no carrinho (Total: R$ 2.999,00)
- Endereço de entrega cadastrado
- Método de pagamento configurado

### Passos de Execução

| # | Ação | Resultado Esperado |
|---|------|-------------------|
| 1 | Acessar o carrinho de compras | Carrinho com produto é exibido |
| 2 | Clicar em "Finalizar Compra" | Página de checkout é aberta |
| 3 | Revisar itens do pedido | Produto e valores corretos |
| 4 | Selecionar endereço de entrega | Endereço selecionado |
| 5 | Calcular frete | Frete calculado: R$ 30,00 |
| 6 | Verificar total | Total: R$ 3.029,00 |
| 7 | Selecionar forma de pagamento: Cartão de Crédito | Opção selecionada |
| 8 | Inserir dados do cartão | Dados aceitos |
| 9 | Revisar resumo do pedido | Todos os dados corretos |
| 10 | Clicar em "Confirmar Pedido" | Pedido sendo processado |
| 11 | - | Redirecionamento para confirmação |
| 12 | - | Número do pedido exibido |
| 13 | - | Email de confirmação enviado |

### Resultado Esperado
- Pedido criado com sucesso
- Número de pedido único gerado
- Status inicial: "Aguardando Pagamento"
- Email de confirmação recebido
- Carrinho limpo

### Dados de Teste
```json
{
  "endereco": {
    "rua": "Av. Paulista, 1000",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310-100"
  },
  "pagamento": {
    "tipo": "cartao_credito",
    "numero": "4111111111111111",
    "validade": "12/25",
    "cvv": "123"
  }
}
```

---

## TC-005: Busca de Produtos com Filtros

**Módulo:** Busca e Filtros  
**Prioridade:** Média  
**Tipo:** Funcional  
**Autor:** Andressa Oliveira  
**Data:** 15/01/2024

### Objetivo
Verificar se a busca de produtos com filtros retorna resultados corretos.

### Pré-condições
- Produtos cadastrados no sistema
- Categorias e filtros disponíveis

### Passos de Execução

| # | Ação | Resultado Esperado |
|---|------|-------------------|
| 1 | Acessar página inicial | Página carregada |
| 2 | Clicar na barra de busca | Campo de busca ativo |
| 3 | Digitar: "notebook" | Texto inserido |
| 4 | Pressionar Enter ou clicar em buscar | Resultados exibidos |
| 5 | Verificar número de resultados | X produtos encontrados |
| 6 | Aplicar filtro: Categoria = "Eletrônicos" | Filtro aplicado |
| 7 | - | Resultados filtrados |
| 8 | Aplicar filtro: Faixa de Preço = R$ 2.000 - R$ 3.000 | Filtro aplicado |
| 9 | - | Resultados refinados |
| 10 | Ordenar por: "Menor Preço" | Lista reordenada |
| 11 | - | Produtos do menor para o maior preço |

### Resultado Esperado
- Busca retorna produtos relevantes
- Filtros funcionam corretamente
- Combinação de filtros funciona
- Ordenação aplicada corretamente
- Contador de resultados atualizado

---

## Matriz de Rastreabilidade

| ID Caso de Teste | Requisito | Prioridade | Status |
|------------------|-----------|------------|--------|
| TC-001 | REQ-001 | Alta | ✅ Aprovado |
| TC-002 | REQ-001 | Alta | ✅ Aprovado |
| TC-003 | REQ-005 | Alta | ⏳ Em Execução |
| TC-004 | REQ-008 | Crítica | ⏳ Em Execução |
| TC-005 | REQ-003 | Média | 📝 Planejado |

---

## Legenda de Status
- ✅ Aprovado - Teste passou
- ❌ Reprovado - Teste falhou
- ⏳ Em Execução - Teste sendo executado
- 📝 Planejado - Teste não iniciado
- 🔄 Bloqueado - Aguardando dependência
