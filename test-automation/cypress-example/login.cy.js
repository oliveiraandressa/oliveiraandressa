// Exemplo de Teste E2E com Cypress
// Framework: Cypress
// Padrão: Page Objects com Custom Commands

describe('Login Flow - E2E Tests', () => {
  
  beforeEach(() => {
    // Visita a página de login antes de cada teste
    cy.visit('https://exemplo.com/login')
  })

  it('Deve realizar login com sucesso com credenciais válidas', () => {
    // Arrange & Act
    cy.get('#username').type('usuario_valido')
    cy.get('#password').type('senha_valida')
    cy.get('#login-button').click()

    // Assert
    cy.url().should('include', '/dashboard')
    cy.get('.welcome-message').should('contain', 'Bem-vindo')
  })

  it('Deve exibir erro ao tentar login com senha inválida', () => {
    // Arrange & Act
    cy.get('#username').type('usuario_valido')
    cy.get('#password').type('senha_invalida')
    cy.get('#login-button').click()

    // Assert
    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Credenciais inválidas')
    cy.url().should('include', '/login')
  })

  it('Deve validar campos obrigatórios', () => {
    // Act - Tenta fazer login sem preencher campos
    cy.get('#login-button').click()

    // Assert
    cy.get('#username').should('have.class', 'input-error')
    cy.get('#password').should('have.class', 'input-error')
  })

  it('Deve manter senha oculta por padrão', () => {
    // Assert
    cy.get('#password').should('have.attr', 'type', 'password')
  })

  it('Deve permitir visualizar senha ao clicar no ícone', () => {
    // Arrange
    cy.get('#password').type('minha_senha_secreta')

    // Act
    cy.get('.toggle-password-visibility').click()

    // Assert
    cy.get('#password').should('have.attr', 'type', 'text')
  })

  // Testes com diferentes resoluções
  const viewports = [
    { device: 'mobile', width: 375, height: 667 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'desktop', width: 1920, height: 1080 }
  ]

  viewports.forEach(viewport => {
    it(`Deve ser responsivo em ${viewport.device}`, () => {
      // Arrange
      cy.viewport(viewport.width, viewport.height)

      // Assert
      cy.get('#login-button').should('be.visible')
      cy.get('#username').should('be.visible')
      cy.get('#password').should('be.visible')
    })
  })
})

// Exemplo de teste com Custom Commands
describe('Login Flow - Using Custom Commands', () => {
  
  beforeEach(() => {
    cy.visit('https://exemplo.com/login')
  })

  it('Deve fazer login usando custom command', () => {
    // Usando um custom command (definido em commands.js)
    cy.login('usuario_valido', 'senha_valida')
    
    // Assert
    cy.url().should('include', '/dashboard')
  })
})

// Exemplo de testes de API + UI
describe('Login Flow - API + UI Integration', () => {
  
  it('Deve validar token JWT após login bem-sucedido', () => {
    // Arrange
    cy.visit('https://exemplo.com/login')

    // Intercepta a requisição de login
    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Act
    cy.get('#username').type('usuario_valido')
    cy.get('#password').type('senha_valida')
    cy.get('#login-button').click()

    // Assert - Valida resposta da API
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
      expect(interception.response.body).to.have.property('token')
      expect(interception.response.body.token).to.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
    })

    // Assert - Valida armazenamento do token
    cy.window().then((win) => {
      const token = win.localStorage.getItem('authToken')
      expect(token).to.exist
    })
  })

  it('Deve simular erro de servidor durante login', () => {
    // Arrange - Força erro 500
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 500,
      body: { error: 'Erro interno do servidor' }
    }).as('loginError')

    // Act
    cy.get('#username').type('usuario_valido')
    cy.get('#password').type('senha_valida')
    cy.get('#login-button').click()

    // Assert
    cy.wait('@loginError')
    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Erro ao processar sua solicitação')
  })
})
