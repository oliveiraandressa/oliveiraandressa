// Exemplo de Teste de Performance com K6
// Framework: K6 (Grafana)
// Cenário: Load Test de E-commerce API

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Métricas customizadas
const errorRate = new Rate('errors');
const loginDuration = new Trend('login_duration');
const productsDuration = new Trend('products_duration');
const checkoutDuration = new Trend('checkout_duration');
const successfulCheckouts = new Counter('successful_checkouts');

// Configuração do teste
export const options = {
  stages: [
    { duration: '1m', target: 50 },   // Ramp-up para 50 usuários em 1 minuto
    { duration: '3m', target: 50 },   // Mantém 50 usuários por 3 minutos
    { duration: '1m', target: 100 },  // Ramp-up para 100 usuários em 1 minuto
    { duration: '3m', target: 100 },  // Mantém 100 usuários por 3 minutos
    { duration: '1m', target: 0 },    // Ramp-down para 0 usuários
  ],
  thresholds: {
    // Critérios de aceitação
    'http_req_duration': ['p(95)<2000', 'p(99)<3000'], // 95% < 2s, 99% < 3s
    'http_req_failed': ['rate<0.01'],                  // Taxa de erro < 1%
    'errors': ['rate<0.05'],                            // Taxa de erro geral < 5%
    'login_duration': ['p(95)<1000'],                   // Login p95 < 1s
    'products_duration': ['p(95)<800'],                 // Produtos p95 < 800ms
    'checkout_duration': ['p(95)<1500'],                // Checkout p95 < 1.5s
  },
};

const BASE_URL = 'https://api.exemplo.com';

// Função para gerar email aleatório
function randomEmail() {
  return `user${Math.random().toString(36).substring(7)}@teste.com`;
}

// Função para realizar login
function login() {
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: randomEmail(),
    password: 'senha123',
  }), {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'Login' },
  });

  const success = check(loginRes, {
    'login status é 200': (r) => r.status === 200,
    'login possui token': (r) => r.json('token') !== undefined,
    'login tempo < 1s': (r) => r.timings.duration < 1000,
  });

  errorRate.add(!success);
  loginDuration.add(loginRes.timings.duration);

  return success ? loginRes.json('token') : null;
}

// Função para listar produtos
function getProducts(token) {
  const productsRes = http.get(`${BASE_URL}/api/products`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    tags: { name: 'ListProducts' },
  });

  const success = check(productsRes, {
    'produtos status é 200': (r) => r.status === 200,
    'produtos é array': (r) => Array.isArray(r.json()),
    'produtos não vazio': (r) => r.json().length > 0,
    'produtos tempo < 800ms': (r) => r.timings.duration < 800,
  });

  errorRate.add(!success);
  productsDuration.add(productsRes.timings.duration);

  return success ? productsRes.json() : [];
}

// Função para adicionar produto ao carrinho
function addToCart(token, productId) {
  const cartRes = http.post(`${BASE_URL}/api/cart`, JSON.stringify({
    productId: productId,
    quantity: 1,
  }), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    tags: { name: 'AddToCart' },
  });

  const success = check(cartRes, {
    'adicionar ao carrinho status é 200': (r) => r.status === 200,
  });

  errorRate.add(!success);
  return success;
}

// Função para realizar checkout
function checkout(token) {
  const checkoutRes = http.post(`${BASE_URL}/api/checkout`, JSON.stringify({
    paymentMethod: 'credit_card',
    shippingAddress: {
      street: 'Rua Teste, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
    },
  }), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    tags: { name: 'Checkout' },
  });

  const success = check(checkoutRes, {
    'checkout status é 201': (r) => r.status === 201,
    'checkout possui orderNumber': (r) => r.json('orderNumber') !== undefined,
    'checkout tempo < 1.5s': (r) => r.timings.duration < 1500,
  });

  errorRate.add(!success);
  checkoutDuration.add(checkoutRes.timings.duration);

  if (success) {
    successfulCheckouts.add(1);
  }

  return success;
}

// Função principal do teste
export default function () {
  // Grupo: Fluxo de compra completo
  group('Fluxo de Compra Completo', () => {
    // 1. Login
    const token = login();
    if (!token) {
      console.log('Falha no login, pulando resto do fluxo');
      return;
    }
    
    sleep(1); // Pensar entre ações

    // 2. Listar produtos
    const products = getProducts(token);
    if (products.length === 0) {
      console.log('Nenhum produto encontrado');
      return;
    }

    sleep(2); // Navegar pela lista

    // 3. Ver detalhes de um produto
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const productRes = http.get(`${BASE_URL}/api/products/${randomProduct.id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      tags: { name: 'GetProduct' },
    });

    check(productRes, {
      'produto detalhes status é 200': (r) => r.status === 200,
    });

    sleep(3); // Ler descrição do produto

    // 4. Adicionar ao carrinho
    const addedToCart = addToCart(token, randomProduct.id);
    if (!addedToCart) {
      console.log('Falha ao adicionar ao carrinho');
      return;
    }

    sleep(1);

    // 5. Realizar checkout
    checkout(token);

    sleep(1); // Pausa entre iterações
  });
}

// Função executada no final do teste
export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// Função para criar resumo em texto
function textSummary(data, options) {
  const summary = [];
  
  summary.push('\n📊 RESUMO DO TESTE DE PERFORMANCE\n');
  summary.push('================================\n\n');
  
  // Estatísticas HTTP
  summary.push('🌐 Requisições HTTP:\n');
  summary.push(`   Total: ${data.metrics.http_reqs.values.count}\n`);
  summary.push(`   Taxa: ${data.metrics.http_reqs.values.rate.toFixed(2)} req/s\n`);
  summary.push(`   Falhas: ${data.metrics.http_req_failed.values.rate.toFixed(2)}%\n\n`);
  
  // Tempos de resposta
  summary.push('⏱️  Tempos de Resposta:\n');
  summary.push(`   Médio: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms\n`);
  summary.push(`   P95: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms\n`);
  summary.push(`   P99: ${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}ms\n\n`);
  
  // Checkouts bem-sucedidos
  if (data.metrics.successful_checkouts) {
    summary.push('✅ Checkouts Concluídos:\n');
    summary.push(`   Total: ${data.metrics.successful_checkouts.values.count}\n\n`);
  }
  
  return summary.join('');
}
