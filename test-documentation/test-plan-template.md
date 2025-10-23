# Plano de Teste - Sistema de E-commerce

## 1. Informações do Projeto

**Projeto:** Sistema de E-commerce  
**Versão:** 2.0  
**Data:** Janeiro 2024  
**Responsável QA:** Andressa Oliveira  
**Ambiente:** Homologação / Produção

---

## 2. Objetivo

Este plano de teste define a estratégia, escopo, recursos e cronograma das atividades de teste para a versão 2.0 do Sistema de E-commerce.

### 2.1 Objetivos Específicos

- Validar todas as funcionalidades principais do sistema
- Garantir a qualidade e usabilidade da interface
- Verificar a performance e escalabilidade
- Assegurar a segurança dos dados dos usuários
- Validar a compatibilidade entre navegadores e dispositivos

---

## 3. Escopo do Teste

### 3.1 Funcionalidades em Escopo

#### 3.1.1 Módulo de Autenticação
- Login de usuários
- Cadastro de novos usuários
- Recuperação de senha
- Autenticação de dois fatores (2FA)

#### 3.1.2 Módulo de Produtos
- Listagem de produtos
- Busca e filtros
- Visualização de detalhes
- Avaliações e comentários

#### 3.1.3 Módulo de Carrinho
- Adicionar/remover produtos
- Atualizar quantidades
- Calcular frete
- Aplicar cupons de desconto

#### 3.1.4 Módulo de Checkout
- Cadastro de endereço de entrega
- Seleção de forma de pagamento
- Confirmação de pedido
- Processamento de pagamento

#### 3.1.5 Módulo de Pedidos
- Histórico de pedidos
- Rastreamento de entregas
- Cancelamento de pedidos
- Solicitação de devolução

### 3.2 Funcionalidades Fora do Escopo

- Módulo administrativo (será testado separadamente)
- Integrações com sistemas legados
- Migração de dados

---

## 4. Abordagem de Teste

### 4.1 Níveis de Teste

#### Testes Funcionais
- **Objetivo:** Validar que o sistema atende aos requisitos funcionais
- **Cobertura:** 100% dos casos de uso principais
- **Responsável:** Time de QA

#### Testes de Integração
- **Objetivo:** Verificar a comunicação entre módulos
- **Cobertura:** APIs, banco de dados, serviços externos
- **Responsável:** Time de QA + Desenvolvimento

#### Testes de Sistema
- **Objetivo:** Validar o sistema como um todo
- **Cobertura:** Fluxos end-to-end
- **Responsável:** Time de QA

#### Testes de Aceitação
- **Objetivo:** Validar critérios de aceite do negócio
- **Cobertura:** Cenários críticos de negócio
- **Responsável:** Product Owner + QA

### 4.2 Tipos de Teste

| Tipo de Teste | Descrição | Ferramenta | Prioridade |
|---------------|-----------|------------|------------|
| Funcional | Validação de funcionalidades | Manual / Selenium | Alta |
| Regressão | Verificar que alterações não quebraram funcionalidades existentes | Cypress | Alta |
| Performance | Validar tempos de resposta e capacidade | JMeter / K6 | Média |
| Segurança | Verificar vulnerabilidades | OWASP ZAP | Alta |
| Usabilidade | Avaliar experiência do usuário | Manual | Média |
| Compatibilidade | Testar em diferentes navegadores/dispositivos | BrowserStack | Média |
| Acessibilidade | Validar WCAG 2.1 | Axe / WAVE | Média |

---

## 5. Critérios de Entrada e Saída

### 5.1 Critérios de Entrada
- ✅ Todos os requisitos documentados e aprovados
- ✅ Ambiente de teste configurado e disponível
- ✅ Build deployado no ambiente de homologação
- ✅ Dados de teste preparados
- ✅ Ferramentas de teste instaladas e configuradas

### 5.2 Critérios de Saída
- ✅ 100% dos casos de teste executados
- ✅ 95% dos casos de teste passando
- ✅ Todos os bugs críticos e altos resolvidos
- ✅ Bugs médios e baixos documentados e priorizados
- ✅ Relatório de testes aprovado pelos stakeholders
- ✅ Testes de regressão executados com sucesso

---

## 6. Recursos

### 6.1 Equipe

| Nome | Papel | Responsabilidade |
|------|-------|------------------|
| Andressa Oliveira | QA Lead | Coordenação, planejamento e execução |
| Tester 1 | QA Engineer | Execução de testes funcionais |
| Tester 2 | Automation Engineer | Automação de testes |
| Dev Lead | Developer | Suporte técnico e correções |

### 6.2 Ferramentas

- **Gestão de Testes:** TestRail, Jira
- **Automação Web:** Selenium, Cypress, Playwright
- **Automação API:** Postman, REST Assured
- **Performance:** JMeter, K6
- **Bug Tracking:** Jira
- **CI/CD:** Jenkins, GitHub Actions

### 6.3 Ambientes

| Ambiente | URL | Finalidade |
|----------|-----|------------|
| Desenvolvimento | dev.exemplo.com | Testes de desenvolvimento |
| Homologação | staging.exemplo.com | Testes formais |
| Produção | www.exemplo.com | Testes de fumaça |

---

## 7. Cronograma

| Fase | Atividade | Início | Fim | Duração |
|------|-----------|--------|-----|---------|
| 1 | Planejamento de Testes | 02/01/2024 | 05/01/2024 | 3 dias |
| 2 | Desenvolvimento de Casos de Teste | 08/01/2024 | 15/01/2024 | 5 dias |
| 3 | Preparação de Ambiente | 08/01/2024 | 10/01/2024 | 2 dias |
| 4 | Execução de Testes Funcionais | 16/01/2024 | 26/01/2024 | 8 dias |
| 5 | Execução de Testes de Regressão | 29/01/2024 | 31/01/2024 | 2 dias |
| 6 | Testes de Performance | 01/02/2024 | 02/02/2024 | 2 dias |
| 7 | Testes de Segurança | 05/02/2024 | 07/02/2024 | 2 dias |
| 8 | Reteste de Bugs | Contínuo | - | - |
| 9 | Relatório Final | 08/02/2024 | 09/02/2024 | 1 dia |

---

## 8. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Atraso na entrega do build | Média | Alto | Buffer de 2 dias no cronograma |
| Indisponibilidade do ambiente | Baixa | Alto | Ambiente backup configurado |
| Falta de dados de teste | Baixa | Médio | Scripts de geração de dados prontos |
| Rotatividade da equipe | Baixa | Médio | Documentação detalhada |
| Bugs críticos encontrados tarde | Média | Alto | Testes contínuos durante desenvolvimento |

---

## 9. Entregas

- ✅ Plano de Teste (este documento)
- ✅ Casos de Teste documentados
- ✅ Scripts de automação
- ✅ Relatório de Execução de Testes
- ✅ Relatório de Bugs
- ✅ Relatório de Cobertura
- ✅ Evidências de Teste (screenshots, logs)
- ✅ Relatório Final de Qualidade

---

## 10. Aprovação

| Nome | Cargo | Assinatura | Data |
|------|-------|------------|------|
| Andressa Oliveira | QA Lead | ___________ | ___/___/___ |
| Product Owner | PO | ___________ | ___/___/___ |
| Tech Lead | Tech Lead | ___________ | ___/___/___ |

---

**Versão do Documento:** 1.0  
**Data da Última Atualização:** Janeiro 2024  
**Próxima Revisão:** Fevereiro 2024
