"""
Exemplo de Teste Automatizado com Selenium WebDriver
Padrão: Page Object Model (POM)
Framework: Pytest
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class LoginPage:
    """Page Object para a página de login"""
    
    def __init__(self, driver):
        self.driver = driver
        self.username_input = (By.ID, "username")
        self.password_input = (By.ID, "password")
        self.login_button = (By.ID, "login-button")
        self.error_message = (By.CLASS_NAME, "error-message")
    
    def open(self, url):
        """Abre a página de login"""
        self.driver.get(url)
    
    def enter_username(self, username):
        """Insere o nome de usuário"""
        element = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located(self.username_input)
        )
        element.clear()
        element.send_keys(username)
    
    def enter_password(self, password):
        """Insere a senha"""
        element = self.driver.find_element(*self.password_input)
        element.clear()
        element.send_keys(password)
    
    def click_login(self):
        """Clica no botão de login"""
        self.driver.find_element(*self.login_button).click()
    
    def get_error_message(self):
        """Retorna a mensagem de erro"""
        element = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located(self.error_message)
        )
        return element.text
    
    def login(self, username, password):
        """Realiza o login completo"""
        self.enter_username(username)
        self.enter_password(password)
        self.click_login()


@pytest.fixture
def driver():
    """Fixture para configurar e encerrar o driver"""
    driver = webdriver.Chrome()
    driver.maximize_window()
    yield driver
    driver.quit()


@pytest.fixture
def login_page(driver):
    """Fixture para a página de login"""
    return LoginPage(driver)


class TestLogin:
    """Suite de testes para funcionalidade de login"""
    
    BASE_URL = "https://exemplo.com/login"
    
    def test_login_com_credenciais_validas(self, login_page, driver):
        """
        Teste: Login com credenciais válidas
        Resultado esperado: Usuário deve ser redirecionado para o dashboard
        """
        # Arrange
        login_page.open(self.BASE_URL)
        
        # Act
        login_page.login("usuario_valido", "senha_valida")
        
        # Assert
        WebDriverWait(driver, 10).until(
            EC.url_contains("/dashboard")
        )
        assert "/dashboard" in driver.current_url
    
    def test_login_com_senha_invalida(self, login_page):
        """
        Teste: Login com senha inválida
        Resultado esperado: Mensagem de erro deve ser exibida
        """
        # Arrange
        login_page.open(self.BASE_URL)
        
        # Act
        login_page.login("usuario_valido", "senha_invalida")
        
        # Assert
        error_message = login_page.get_error_message()
        assert "Credenciais inválidas" in error_message
    
    def test_login_com_campos_vazios(self, login_page):
        """
        Teste: Tentativa de login com campos vazios
        Resultado esperado: Mensagem de erro sobre campos obrigatórios
        """
        # Arrange
        login_page.open(self.BASE_URL)
        
        # Act
        login_page.click_login()
        
        # Assert
        error_message = login_page.get_error_message()
        assert "Campo obrigatório" in error_message or "Preencha todos os campos" in error_message
    
    @pytest.mark.parametrize("username,password,expected_error", [
        ("", "senha123", "Campo obrigatório"),
        ("usuario", "", "Campo obrigatório"),
        ("usuario_bloqueado", "senha123", "Conta bloqueada"),
        ("usuario@invalido", "senha123", "Formato de usuário inválido"),
    ])
    def test_login_casos_negativos(self, login_page, username, password, expected_error):
        """
        Teste parametrizado: Diversos casos de falha no login
        """
        # Arrange
        login_page.open(self.BASE_URL)
        
        # Act
        login_page.login(username, password)
        
        # Assert
        error_message = login_page.get_error_message()
        assert expected_error in error_message


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--html=report.html"])
