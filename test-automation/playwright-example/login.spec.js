// Exemplo de Testes com Playwright
// Framework: Playwright
// Linguagem: JavaScript/TypeScript

import { test, expect } from '@playwright/test';

test.describe('Login Flow - Playwright Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navega para a página de login antes de cada teste
    await page.goto('https://exemplo.com/login');
  });

  test('Deve realizar login com credenciais válidas', async ({ page }) => {
    // Arrange & Act
    await page.fill('#username', 'usuario_valido');
    await page.fill('#password', 'senha_valida');
    await page.click('#login-button');

    // Assert
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('.welcome-message')).toContainText('Bem-vindo');
  });

  test('Deve exibir mensagem de erro com credenciais inválidas', async ({ page }) => {
    // Arrange & Act
    await page.fill('#username', 'usuario_invalido');
    await page.fill('#password', 'senha_invalida');
    await page.click('#login-button');

    // Assert
    const errorMessage = page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Credenciais inválidas');
  });

  test('Deve validar acessibilidade dos elementos de login', async ({ page }) => {
    // Assert - Verifica atributos de acessibilidade
    await expect(page.locator('#username')).toHaveAttribute('aria-label', 'Nome de usuário');
    await expect(page.locator('#password')).toHaveAttribute('aria-label', 'Senha');
    await expect(page.locator('#login-button')).toHaveAttribute('aria-label', 'Fazer login');
  });

  test('Deve capturar screenshot em caso de falha', async ({ page }) => {
    // Este teste demonstra captura de evidência
    await page.fill('#username', 'teste');
    await page.fill('#password', 'teste123');
    
    // Captura screenshot antes de clicar
    await page.screenshot({ path: 'evidence/before-login.png' });
    
    await page.click('#login-button');
    
    // Captura screenshot após tentativa de login
    await page.screenshot({ path: 'evidence/after-login.png' });
  });
});

test.describe('Login Flow - Multi-browser Tests', () => {
  
  test('Deve funcionar em diferentes navegadores', async ({ page, browserName }) => {
    await page.goto('https://exemplo.com/login');
    
    await page.fill('#username', 'usuario_valido');
    await page.fill('#password', 'senha_valida');
    await page.click('#login-button');

    await expect(page).toHaveURL(/.*dashboard/);
    
    console.log(`Teste executado com sucesso no navegador: ${browserName}`);
  });
});

test.describe('Login Flow - Performance Tests', () => {
  
  test('Deve carregar a página de login em menos de 3 segundos', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://exemplo.com/login');
    
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
    console.log(`Tempo de carregamento: ${loadTime}ms`);
  });

  test('Deve processar login em menos de 2 segundos', async ({ page }) => {
    await page.goto('https://exemplo.com/login');
    
    await page.fill('#username', 'usuario_valido');
    await page.fill('#password', 'senha_valida');
    
    const startTime = Date.now();
    
    // Aguarda navegação após clicar
    await Promise.all([
      page.waitForNavigation(),
      page.click('#login-button')
    ]);
    
    const loginTime = Date.now() - startTime;
    
    expect(loginTime).toBeLessThan(2000);
    console.log(`Tempo de processamento do login: ${loginTime}ms`);
  });
});

test.describe('Login Flow - API Mocking', () => {
  
  test('Deve simular resposta lenta da API', async ({ page }) => {
    // Mock da API com delay
    await page.route('**/api/auth/login', async route => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3s delay
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ 
          token: 'fake-jwt-token',
          user: { id: 1, name: 'Test User' }
        })
      });
    });

    await page.goto('https://exemplo.com/login');
    await page.fill('#username', 'usuario_valido');
    await page.fill('#password', 'senha_valida');
    
    // Verifica se o loading spinner aparece
    await page.click('#login-button');
    await expect(page.locator('.loading-spinner')).toBeVisible();
  });

  test('Deve lidar com erro de rede', async ({ page }) => {
    // Simula erro de rede
    await page.route('**/api/auth/login', route => route.abort('failed'));

    await page.goto('https://exemplo.com/login');
    await page.fill('#username', 'usuario_valido');
    await page.fill('#password', 'senha_valida');
    await page.click('#login-button');

    // Verifica mensagem de erro de rede
    await expect(page.locator('.error-message')).toContainText('Erro de conexão');
  });
});

test.describe('Login Flow - Visual Regression', () => {
  
  test('Deve validar aparência visual da página de login', async ({ page }) => {
    await page.goto('https://exemplo.com/login');
    
    // Comparação visual com snapshot
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('Deve validar estado de erro visual', async ({ page }) => {
    await page.goto('https://exemplo.com/login');
    
    await page.fill('#username', 'invalido');
    await page.fill('#password', 'invalido');
    await page.click('#login-button');
    
    await page.waitForSelector('.error-message');
    
    // Snapshot do estado de erro
    await expect(page).toHaveScreenshot('login-error-state.png');
  });
});
