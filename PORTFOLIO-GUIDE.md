# 📚 Guia do Portfólio QA

## 🎯 Visão Geral

Este repositório serve como portfólio profissional demonstrando habilidades em Quality Assurance (QA) e automação de testes. Aqui você encontrará exemplos práticos, documentação de qualidade e boas práticas da indústria.

## 🗂️ Estrutura do Repositório

```
oliveiraandressa/
├── README.md                          # Perfil principal com resumo
├── PORTFOLIO-GUIDE.md                 # Este guia
│
├── test-automation/                   # 🤖 Automação de Testes
│   ├── selenium-example/              # Python + Selenium + Pytest
│   │   ├── test_login.py
│   │   ├── requirements.txt
│   │   └── README.md
│   ├── cypress-example/               # Cypress (JavaScript)
│   │   ├── login.cy.js
│   │   ├── package.json
│   │   └── README.md
│   ├── playwright-example/            # Playwright (JavaScript)
│   │   ├── login.spec.js
│   │   ├── package.json
│   │   └── README.md
│   └── README.md
│
├── api-testing/                       # 🔌 Testes de API
│   ├── postman-collection.json        # Coleção Postman
│   ├── test_api_python.py             # Python + Requests
│   ├── requirements.txt
│   └── README.md
│
├── performance-testing/               # ⚡ Testes de Performance
│   ├── k6-load-test.js                # K6 load testing
│   └── README.md
│
├── test-documentation/                # 📝 Documentação
│   ├── test-plan-template.md         # Template de Plano de Teste
│   ├── test-cases-examples.md        # Exemplos de Casos de Teste
│   └── README.md
│
└── bug-reports/                       # 🐛 Relatórios de Bugs
    ├── bug-report-examples.md         # Exemplos de Bug Reports
    └── README.md
```

## 🚀 Como Usar Este Portfólio

### Para Recrutadores e Gestores

1. **Visão Rápida**: Comece pelo [README.md](./README.md) principal
2. **Habilidades Técnicas**: Veja a seção de skills e tecnologias
3. **Exemplos Práticos**: Navegue pelas pastas para ver código real
4. **Documentação**: Confira os templates em `test-documentation/`

### Para Desenvolvedores e QAs

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/oliveiraandressa/oliveiraandressa.git
   cd oliveiraandressa
   ```

2. **Explore os exemplos de código**:
   - Cada pasta tem seu próprio README com instruções
   - Instale as dependências e execute os testes
   - Adapte os exemplos para seus projetos

3. **Use como referência**:
   - Templates de documentação
   - Estrutura de testes
   - Boas práticas de QA

## 🛠️ Tecnologias e Ferramentas

### Automação Web
- **Selenium WebDriver** - Automação tradicional e robusta
- **Cypress** - Framework moderno e developer-friendly
- **Playwright** - Cross-browser testing avançado

### Automação API
- **Postman** - Testes de API e documentação
- **Python Requests** - Automação programática
- **REST Assured** - Framework Java para APIs

### Performance
- **K6** - Load testing moderno
- **Apache JMeter** - Performance testing tradicional

### Linguagens
- **Python** - Para Selenium, pytest, API testing
- **JavaScript** - Para Cypress, Playwright, K6
- **Java** - Para REST Assured, TestNG

### CI/CD e Ferramentas
- **Git & GitHub** - Controle de versão
- **GitHub Actions** - CI/CD pipelines
- **Jenkins** - Continuous Integration
- **Docker** - Containerização

### Gestão de Testes
- **Jira** - Bug tracking e gestão de projetos
- **TestRail** - Test case management
- **Confluence** - Documentação

## 📖 Exemplos Destacados

### 1. Automação Web com Page Object Model
📁 `test-automation/selenium-example/test_login.py`

Demonstra:
- Padrão POM (Page Object Model)
- Fixtures do pytest
- Waits explícitos
- Testes parametrizados

### 2. Testes E2E Modernos
📁 `test-automation/cypress-example/login.cy.js`

Demonstra:
- API mocking com cy.intercept
- Testes responsivos
- Custom commands
- Validação de performance

### 3. Testes Cross-Browser
📁 `test-automation/playwright-example/login.spec.js`

Demonstra:
- Multi-browser testing
- Visual regression
- Performance metrics
- Accessibility testing

### 4. Testes de API Completos
📁 `api-testing/test_api_python.py`

Demonstra:
- Testes de autenticação
- Validação de schemas JSON
- Testes de performance de API
- Data-driven testing

### 5. Performance Testing
📁 `performance-testing/k6-load-test.js`

Demonstra:
- Load testing
- Métricas customizadas
- Thresholds e SLAs
- Cenários complexos

## 📋 Templates de Documentação

### Plano de Teste Completo
📁 `test-documentation/test-plan-template.md`

Inclui:
- Objetivos e escopo
- Estratégia de teste
- Recursos e cronograma
- Critérios de entrada/saída
- Riscos e mitigações

### Casos de Teste Detalhados
📁 `test-documentation/test-cases-examples.md`

Inclui:
- Estrutura padronizada
- Casos positivos e negativos
- Matriz de rastreabilidade
- Dados de teste

### Bug Reports Profissionais
📁 `bug-reports/bug-report-examples.md`

Inclui:
- Severidade e prioridade
- Passos para reproduzir
- Evidências visuais
- Análise de impacto

## 🎓 Conhecimentos Demonstrados

### Tipos de Teste
- ✅ Testes Funcionais
- ✅ Testes de Integração
- ✅ Testes E2E (End-to-End)
- ✅ Testes de API
- ✅ Testes de Performance
- ✅ Testes de Regressão
- ✅ Testes de Aceitação

### Metodologias
- ✅ BDD (Behavior Driven Development)
- ✅ TDD (Test Driven Development)
- ✅ Agile/Scrum
- ✅ CI/CD Integration
- ✅ Test Automation Pyramid

### Boas Práticas
- ✅ Page Object Model
- ✅ Data-Driven Testing
- ✅ AAA Pattern (Arrange, Act, Assert)
- ✅ DRY (Don't Repeat Yourself)
- ✅ Waits Explícitos
- ✅ Testes Isolados
- ✅ Naming Conventions Claras

## 🔄 Executando os Exemplos

### Selenium (Python)
```bash
cd test-automation/selenium-example
pip install -r requirements.txt
pytest test_login.py -v
```

### Cypress (JavaScript)
```bash
cd test-automation/cypress-example
npm install
npm run test:open
```

### Playwright (JavaScript)
```bash
cd test-automation/playwright-example
npm install
npx playwright install
npm test
```

### API Testing (Python)
```bash
cd api-testing
pip install -r requirements.txt
pytest test_api_python.py -v
```

### K6 Performance
```bash
cd performance-testing
k6 run k6-load-test.js
```

## 📊 Métricas de Qualidade

Este portfólio demonstra capacidade de:

- **Cobertura de Testes**: Exemplos abrangem múltiplos níveis
- **Automação**: Taxa de automação > 80% dos casos comuns
- **Documentação**: Templates profissionais e detalhados
- **Boas Práticas**: Código limpo e manutenível
- **Ferramentas Modernas**: Stack atualizado

## 🌟 Diferenciais

- ✨ **Código Real e Funcional**: Não são apenas conceitos
- ✨ **Múltiplas Tecnologias**: Versatilidade demonstrada
- ✨ **Documentação Completa**: Cada exemplo bem documentado
- ✨ **Padrões da Indústria**: Seguindo best practices
- ✨ **Pronto para Uso**: Pode ser adaptado para projetos reais

## 📞 Contato

Para dúvidas, sugestões ou oportunidades:

- 💼 LinkedIn: [linkedin.com/in/oliveiraandressa](https://linkedin.com/in/oliveiraandressa)
- 📧 Email: [seu-email@exemplo.com](mailto:seu-email@exemplo.com)
- 🌐 Portfolio: [oliveiraandressa.github.io](https://oliveiraandressa.github.io)

## 📝 Licença

Este repositório é um portfólio pessoal. Os exemplos de código podem ser usados como referência para fins educacionais.

---

**Desenvolvido com ❤️ por Andressa Oliveira**

*Quality Assurance Engineer | Test Automation Specialist*
