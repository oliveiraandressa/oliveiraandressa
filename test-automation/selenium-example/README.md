# Selenium WebDriver Example

## 📋 Descrição

Exemplo de automação de testes web utilizando Selenium WebDriver com Python e pytest, seguindo o padrão Page Object Model (POM).

## 🛠️ Tecnologias

- Python 3.8+
- Selenium WebDriver
- Pytest
- pytest-html (para relatórios)

## 📦 Instalação

```bash
# Criar ambiente virtual (opcional, mas recomendado)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt
```

## 🚀 Execução

```bash
# Executar todos os testes
pytest test_login.py -v

# Executar com relatório HTML
pytest test_login.py -v --html=report.html

# Executar teste específico
pytest test_login.py::TestLogin::test_login_com_credenciais_validas -v

# Executar testes com marcadores
pytest test_login.py -m parametrize -v
```

## 📁 Estrutura

```
selenium-example/
├── test_login.py          # Suite de testes de login
├── requirements.txt       # Dependências Python
└── README.md             # Este arquivo
```

## 🎯 Casos de Teste Incluídos

- ✅ Login com credenciais válidas
- ✅ Login com senha inválida
- ✅ Login com campos vazios
- ✅ Casos negativos parametrizados

## 📚 Conceitos Demonstrados

- **Page Object Model (POM)** - Separação de elementos e ações
- **Waits Explícitos** - Sincronização adequada
- **Fixtures do Pytest** - Setup e teardown
- **Testes Parametrizados** - Data-driven testing
- **Padrão AAA** - Arrange, Act, Assert

## 🔧 Configuração do WebDriver

Este exemplo usa ChromeDriver. Certifique-se de ter o Chrome instalado ou ajuste para outro navegador:

```python
# Para Firefox
driver = webdriver.Firefox()

# Para Edge
driver = webdriver.Edge()
```

## 📊 Relatórios

Os testes geram relatórios HTML automaticamente quando executados com a opção `--html`:

```bash
pytest test_login.py --html=report.html --self-contained-html
```
