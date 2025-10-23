# Cypress E2E Example

## 📋 Descrição

Exemplos de testes end-to-end modernos usando Cypress, incluindo testes de UI, API mocking e validação cross-browser.

## 🛠️ Tecnologias

- Cypress 13.x
- JavaScript/ES6+
- Cypress Testing Library

## 📦 Instalação

```bash
# Instalar dependências
npm install

# ou
yarn install
```

## 🚀 Execução

```bash
# Abrir Cypress Test Runner (modo interativo)
npm run test:open

# Executar testes em modo headless
npm test

# Executar em navegador específico
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## 📁 Estrutura

```
cypress-example/
├── login.cy.js           # Testes de login
├── package.json          # Dependências Node.js
└── README.md            # Este arquivo
```

## 🎯 Casos de Teste Incluídos

### Testes Funcionais
- ✅ Login com credenciais válidas
- ✅ Validação de erro com credenciais inválidas
- ✅ Validação de campos obrigatórios
- ✅ Toggle de visualização de senha

### Testes Responsivos
- ✅ Validação em múltiplas resoluções (mobile, tablet, desktop)

### Testes de Integração API + UI
- ✅ Validação de token JWT após login
- ✅ Simulação de erro de servidor
- ✅ Interceptação e validação de requisições

## 📚 Conceitos Demonstrados

- **Custom Commands** - Comandos reutilizáveis
- **API Mocking** - cy.intercept para simular respostas
- **Viewport Testing** - Testes responsivos
- **Assertions Encadeadas** - Validações múltiplas
- **Network Inspection** - Validação de requisições/respostas

## 🔧 Configuração

Para configurar o Cypress, crie um arquivo `cypress.config.js`:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://exemplo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
  },
})
```

## 📊 Relatórios e Screenshots

Cypress gera automaticamente:
- 📹 Vídeos dos testes (pasta `cypress/videos/`)
- 📸 Screenshots de falhas (pasta `cypress/screenshots/`)

## 🎨 Boas Práticas Implementadas

- ✅ Seletores baseados em data attributes
- ✅ Timeouts adequados
- ✅ Assertions descritivas
- ✅ Testes isolados e independentes
- ✅ Page Objects implícitos
