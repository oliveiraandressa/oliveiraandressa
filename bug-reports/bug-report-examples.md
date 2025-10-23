# Exemplos de Bug Reports

## BUG-001: Usuário não consegue finalizar compra com cartão de crédito

**Severidade:** 🔴 Crítica  
**Prioridade:** P0  
**Status:** ✅ Resolvido  
**Ambiente:** Produção  
**Navegador:** Chrome 120.0.6099.130  
**Sistema Operacional:** Windows 11  
**Versão:** v2.1.0  
**Reportado por:** Andressa Oliveira  
**Atribuído a:** Time de Backend  
**Data:** 20/01/2024  
**Resolvido em:** 20/01/2024

### Descrição
Sistema retorna erro 500 ao tentar finalizar compra utilizando cartão de crédito como forma de pagamento. O problema impede que usuários completem suas compras, impactando diretamente nas vendas.

### Passos para Reproduzir
1. Fazer login no sistema com usuário válido
2. Adicionar qualquer produto ao carrinho
3. Acessar o carrinho e clicar em "Finalizar Compra"
4. Preencher endereço de entrega
5. Selecionar "Cartão de Crédito" como forma de pagamento
6. Inserir dados do cartão:
   - Número: 4111 1111 1111 1111 (cartão de teste)
   - Validade: 12/25
   - CVV: 123
   - Nome: TESTE USUARIO
7. Clicar em "Confirmar Pedido"

### Resultado Esperado
- Pedido deve ser processado com sucesso
- Usuário deve ser redirecionado para página de confirmação
- Número do pedido deve ser exibido
- Email de confirmação deve ser enviado

### Resultado Obtido
- Mensagem de erro genérica: "Erro ao processar sua solicitação"
- Status HTTP 500 (Internal Server Error)
- Usuário permanece na página de checkout
- Nenhum pedido é criado no sistema

### Evidências

#### Screenshot do Erro
```
[Tela de checkout com mensagem de erro em vermelho]
```

#### Log do Console do Navegador
```javascript
POST https://api.exemplo.com/api/checkout 500 (Internal Server Error)
Error: Failed to process payment
    at checkoutService.js:156
    at async processOrder()
```

#### Log do Servidor (Backend)
```
[2024-01-20 10:30:45] ERROR: PaymentGatewayException: Connection timeout
[2024-01-20 10:30:45] Stack trace:
  at PaymentGateway.processPayment (payment.service.js:89)
  at CheckoutController.createOrder (checkout.controller.js:45)
```

#### Request/Response da API
**Request:**
```json
POST /api/checkout
{
  "items": [
    {
      "productId": 123,
      "quantity": 1,
      "price": 2999.00
    }
  ],
  "payment": {
    "method": "credit_card",
    "cardNumber": "4111111111111111",
    "expiry": "12/25",
    "cvv": "123"
  },
  "shipping": {
    "address": "Av. Paulista, 1000",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01310-100"
  }
}
```

**Response:**
```json
HTTP 500 Internal Server Error
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

### Informações Adicionais
- **Frequência:** Sempre (100% de reprodução)
- **Impacto:** Alto - Todos os usuários afetados
- **Primeiro Ocorrido:** 20/01/2024 às 09:45
- **Número de Incidentes:** 47 tentativas falhadas em 1 hora
- **Workaround:** Não existe workaround no momento
- **Dados de Teste Utilizados:** Cartão de teste Visa (4111 1111 1111 1111)

### Análise de Causa Raiz
Timeout na comunicação com o gateway de pagamento externo devido a configuração incorreta do timeout (estava em 5s, deveria ser 30s).

### Resolução
- Ajustado timeout da conexão com gateway de 5s para 30s
- Implementado retry automático (3 tentativas)
- Melhorada mensagem de erro para o usuário
- Adicionado log detalhado para debugging

### Commits Relacionados
- `fix: increase payment gateway timeout` (#1234)
- `feat: add retry mechanism for payment processing` (#1235)

---

## BUG-002: Filtro de preço não funciona corretamente na busca de produtos

**Severidade:** 🟡 Média  
**Prioridade:** P2  
**Status:** 🔄 Em Progresso  
**Ambiente:** Staging  
**Navegador:** Firefox 121.0  
**Sistema Operacional:** macOS Sonoma 14.2  
**Versão:** v2.1.0  
**Reportado por:** Andressa Oliveira  
**Atribuído a:** Time de Frontend  
**Data:** 18/01/2024

### Descrição
Ao aplicar filtro de faixa de preço na busca de produtos, alguns produtos fora da faixa selecionada ainda aparecem nos resultados.

### Passos para Reproduzir
1. Acessar a página de produtos (https://staging.exemplo.com/produtos)
2. Na barra lateral, localizar o filtro "Faixa de Preço"
3. Selecionar faixa: R$ 1.000,00 - R$ 2.000,00
4. Clicar em "Aplicar Filtro"
5. Observar os resultados exibidos

### Resultado Esperado
- Apenas produtos com preço entre R$ 1.000,00 e R$ 2.000,00 devem ser exibidos
- Contador deve mostrar o número correto de produtos filtrados

### Resultado Obtido
- Produtos com preço de R$ 2.500,00 e R$ 850,00 também aparecem nos resultados
- Dos 25 produtos exibidos, 7 estão fora da faixa selecionada
- Contador mostra "25 produtos encontrados" mas deveria mostrar "18 produtos encontrados"

### Evidências

#### Screenshot dos Resultados
```
[Imagem mostrando produtos fora da faixa destacados]
```

#### Lista de Produtos Incorretos
| ID | Nome | Preço | Status |
|----|------|-------|--------|
| 156 | Smartphone XYZ | R$ 2.500,00 | ❌ Fora da faixa |
| 189 | Fone Bluetooth | R$ 850,00 | ❌ Fora da faixa |
| 201 | Tablet ABC | R$ 2.300,00 | ❌ Fora da faixa |

#### Request da API
```
GET /api/products?minPrice=1000&maxPrice=2000
```

#### Response (Trecho)
```json
{
  "total": 25,
  "items": [
    {
      "id": 156,
      "name": "Smartphone XYZ",
      "price": 2500.00
    },
    // ... outros produtos
  ]
}
```

### Informações Adicionais
- **Frequência:** Sempre
- **Impacto:** Médio - Afeta experiência de busca, mas não bloqueia compra
- **Workaround:** Ordenar por preço e filtrar visualmente
- **Observação:** O problema ocorre apenas quando há produtos em promoção

### Possível Causa
O filtro não está considerando o preço promocional, apenas o preço original. Backend retorna produtos baseado em `originalPrice` ao invés de `salePrice`.

---

## BUG-003: Imagem do produto não carrega em dispositivos móveis

**Severidade:** 🟠 Alta  
**Prioridade:** P1  
**Status:** 🆕 Novo  
**Ambiente:** Produção  
**Dispositivo:** iPhone 14 Pro (iOS 17.2)  
**Navegador:** Safari Mobile  
**Versão:** v2.1.0  
**Reportado por:** Andressa Oliveira  
**Atribuído a:** Time de Frontend  
**Data:** 22/01/2024

### Descrição
Imagens de produtos não carregam corretamente em dispositivos móveis iOS. Aparece um ícone de imagem quebrada no lugar da foto do produto.

### Passos para Reproduzir
1. Acessar o site em um iPhone (Safari)
2. Navegar para qualquer página de produto
3. Observar a imagem principal do produto

### Resultado Esperado
- Imagem do produto deve carregar completamente
- Deve ser responsiva e otimizada para mobile

### Resultado Obtido
- Imagem não carrega
- Ícone de "imagem quebrada" é exibido
- Console mostra erro 403 ao tentar carregar a imagem

### Evidências

#### Screenshot Mobile
```
[Captura de tela do iPhone mostrando imagem quebrada]
```

#### Error Log (Safari Console)
```
Failed to load resource: the server responded with a status of 403 (Forbidden)
https://cdn.exemplo.com/images/products/produto-123.jpg
```

#### Informações da Requisição
```
Request URL: https://cdn.exemplo.com/images/products/produto-123.jpg
Request Method: GET
Status Code: 403 Forbidden
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15
```

### Informações Adicionais
- **Frequência:** Sempre em iOS Safari
- **Impacto:** Alto - 35% dos usuários usam iOS
- **Workaround:** Funciona em navegadores desktop e Android
- **Observação:** Problema iniciou após migração para novo CDN

### Análise Preliminar
Possível problema de configuração de CORS no CDN ou User-Agent blocking para dispositivos iOS.

---

## BUG-004: Contador do carrinho não atualiza após adicionar produto

**Severidade:** 🟢 Baixa  
**Prioridade:** P3  
**Status:** 📝 Planejado  
**Ambiente:** Produção  
**Navegador:** Chrome, Firefox, Safari  
**Versão:** v2.0.5  
**Reportado por:** Andressa Oliveira  
**Atribuído a:** Backlog  
**Data:** 15/01/2024

### Descrição
O badge numérico no ícone do carrinho não atualiza imediatamente após adicionar um produto. É necessário recarregar a página para ver o número atualizado.

### Passos para Reproduzir
1. Acessar qualquer página de produto
2. Observar o ícone do carrinho no header (deve mostrar "0" ou vazio)
3. Clicar em "Adicionar ao Carrinho"
4. Observar o ícone do carrinho no header
5. Recarregar a página
6. Observar novamente o ícone do carrinho

### Resultado Esperado
- Badge do carrinho deve atualizar imediatamente para "1"
- Não deve ser necessário recarregar a página

### Resultado Obtido
- Badge permanece em "0" mesmo após adicionar produto
- Só atualiza após F5 ou navegação para outra página

### Evidências
```
[GIF animado mostrando o comportamento]
```

### Informações Adicionais
- **Frequência:** Sempre
- **Impacto:** Baixo - Não impede a compra, apenas causa confusão visual
- **Workaround:** Recarregar página ou clicar no carrinho
- **Observação:** O produto é adicionado corretamente ao carrinho, apenas a UI não atualiza

### Possível Causa
Event listener do carrinho não está sendo disparado ou componente não está observando a mudança no estado do carrinho.

---

## Estatísticas de Bugs (Janeiro 2024)

### Por Severidade
- 🔴 Crítica: 2 (10%)
- 🟠 Alta: 5 (25%)
- 🟡 Média: 8 (40%)
- 🟢 Baixa: 5 (25%)

### Por Status
- ✅ Resolvidos: 12 (60%)
- 🔄 Em Progresso: 5 (25%)
- 🆕 Novos: 3 (15%)

### Tempo Médio de Resolução
- Crítica: 4 horas
- Alta: 2 dias
- Média: 5 dias
- Baixa: 2 semanas

### Por Módulo
- Checkout: 6 bugs
- Busca/Filtros: 4 bugs
- Carrinho: 3 bugs
- Login/Auth: 2 bugs
- Outros: 5 bugs
