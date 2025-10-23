# Playwright Example

## 📋 Descrição

Exemplos de automação cross-browser com Playwright, incluindo testes de performance, acessibilidade e visual regression.

## 🛠️ Tecnologias

- Playwright 1.40+
- JavaScript/TypeScript
- Multiple Browsers (Chromium, Firefox, WebKit)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Instalar navegadores
npx playwright install
```

## 🚀 Execução

```bash
# Executar todos os testes
npm test

# Executar em modo UI (interativo)
npm run test:ui

# Executar em navegador específico
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Executar com trace
npx playwright test --trace on

# Ver relatório HTML
npx playwright show-report
```

## 📁 Estrutura

```
playwright-example/
├── login.spec.js         # Testes de login
├── package.json          # Dependências Node.js
└── README.md            # Este arquivo
```

## 🎯 Casos de Teste Incluídos

### Testes Funcionais
- ✅ Login com credenciais válidas
- ✅ Validação de erro com credenciais inválidas
- ✅ Validação de acessibilidade (ARIA labels)
- ✅ Captura de screenshots para evidências

### Testes Cross-Browser
- ✅ Execução em Chromium, Firefox e WebKit
- ✅ Validação de compatibilidade

### Testes de Performance
- ✅ Tempo de carregamento da página
- ✅ Tempo de processamento do login
- ✅ Validação de métricas de performance

### Testes Avançados
- ✅ API Mocking com delays
- ✅ Simulação de erros de rede
- ✅ Visual Regression Testing
- ✅ Screenshot comparison

## 📚 Conceitos Demonstrados

- **Auto-waiting** - Espera automática de elementos
- **API Mocking** - Route handlers
- **Paralelização** - Testes em paralelo
- **Visual Testing** - Screenshot comparison
- **Performance Metrics** - Medição de tempos
- **Accessibility Testing** - Validação de ARIA

## 🔧 Configuração

Crie um arquivo `playwright.config.js`:

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2,
  workers: 4,
  reporter: 'html',
  use: {
    baseURL: 'https://exemplo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
```

## 📊 Recursos do Playwright

### Trace Viewer
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

### Codegen (Gerador de código)
```bash
npx playwright codegen https://exemplo.com
```

### Inspector (Debug)
```bash
npx playwright test --debug
```

## 🎨 Vantagens do Playwright

- ✅ Suporte nativo para múltiplos navegadores
- ✅ Auto-waiting inteligente
- ✅ Network interception poderoso
- ✅ Screenshots e vídeos automáticos
- ✅ Trace viewer para debugging
- ✅ Execução paralela eficiente
- ✅ Retry automático de testes flaky
