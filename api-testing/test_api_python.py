"""
Exemplo de Testes de API com Python Requests + Pytest
Framework: Pytest
Biblioteca: Requests
"""

import pytest
import requests
import time
from jsonschema import validate, ValidationError


class TestAPIAuthentication:
    """Testes de autenticação da API"""
    
    BASE_URL = "https://api.exemplo.com"
    
    def test_login_com_credenciais_validas(self):
        """
        Teste: Login com credenciais válidas
        Resultado esperado: Status 200 e token JWT válido
        """
        # Arrange
        payload = {
            "email": "usuario@exemplo.com",
            "password": "senha123"
        }
        
        # Act
        response = requests.post(f"{self.BASE_URL}/auth/login", json=payload)
        
        # Assert
        assert response.status_code == 200, f"Status code esperado: 200, recebido: {response.status_code}"
        
        data = response.json()
        assert "token" in data, "Response deve conter token"
        assert len(data["token"]) > 0, "Token não deve estar vazio"
        
        # Valida formato JWT (3 partes separadas por ponto)
        token_parts = data["token"].split(".")
        assert len(token_parts) == 3, "Token deve estar no formato JWT (3 partes)"
    
    def test_login_com_credenciais_invalidas(self):
        """
        Teste: Login com credenciais inválidas
        Resultado esperado: Status 401 e mensagem de erro
        """
        # Arrange
        payload = {
            "email": "usuario@exemplo.com",
            "password": "senha_errada"
        }
        
        # Act
        response = requests.post(f"{self.BASE_URL}/auth/login", json=payload)
        
        # Assert
        assert response.status_code == 401
        
        data = response.json()
        assert "error" in data
        assert "Credenciais inválidas" in data["error"]
    
    def test_login_sem_autorizacao(self):
        """
        Teste: Acesso a endpoint protegido sem token
        Resultado esperado: Status 401
        """
        # Act
        response = requests.get(f"{self.BASE_URL}/api/products")
        
        # Assert
        assert response.status_code == 401


class TestAPIProducts:
    """Testes de endpoints de produtos"""
    
    BASE_URL = "https://api.exemplo.com"
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Fixture para obter token de autenticação"""
        payload = {"email": "usuario@exemplo.com", "password": "senha123"}
        response = requests.post(f"{self.BASE_URL}/auth/login", json=payload)
        self.token = response.json()["token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}
    
    def test_listar_produtos(self):
        """
        Teste: Listar todos os produtos
        Resultado esperado: Status 200 e lista de produtos
        """
        # Act
        response = requests.get(f"{self.BASE_URL}/api/products", headers=self.headers)
        
        # Assert
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list), "Response deve ser uma lista"
        assert len(data) > 0, "Lista de produtos não deve estar vazia"
        
        # Valida estrutura do primeiro produto
        produto = data[0]
        assert "id" in produto
        assert "name" in produto
        assert "price" in produto
        assert "stock" in produto
    
    def test_buscar_produto_por_id(self):
        """
        Teste: Buscar produto específico por ID
        Resultado esperado: Status 200 e dados do produto
        """
        # Arrange
        product_id = 1
        
        # Act
        response = requests.get(
            f"{self.BASE_URL}/api/products/{product_id}",
            headers=self.headers
        )
        
        # Assert
        assert response.status_code == 200
        
        data = response.json()
        assert data["id"] == product_id
        assert "name" in data
        assert "price" in data
    
    def test_produto_nao_encontrado(self):
        """
        Teste: Buscar produto inexistente
        Resultado esperado: Status 404
        """
        # Arrange
        product_id = 99999
        
        # Act
        response = requests.get(
            f"{self.BASE_URL}/api/products/{product_id}",
            headers=self.headers
        )
        
        # Assert
        assert response.status_code == 404
        
        data = response.json()
        assert "error" in data
        assert "não encontrado" in data["error"].lower()
    
    def test_criar_produto(self):
        """
        Teste: Criar novo produto
        Resultado esperado: Status 201 e produto criado
        """
        # Arrange
        novo_produto = {
            "name": "Produto Teste",
            "description": "Descrição do produto teste",
            "price": 99.90,
            "stock": 50,
            "category": "Eletrônicos"
        }
        
        # Act
        response = requests.post(
            f"{self.BASE_URL}/api/products",
            json=novo_produto,
            headers=self.headers
        )
        
        # Assert
        assert response.status_code == 201
        
        data = response.json()
        assert "id" in data
        assert data["name"] == novo_produto["name"]
        assert data["price"] == novo_produto["price"]
    
    def test_validacao_schema_produto(self):
        """
        Teste: Validar schema JSON do produto
        Resultado esperado: Produto deve seguir schema definido
        """
        # Arrange
        schema = {
            "type": "object",
            "required": ["id", "name", "price", "stock"],
            "properties": {
                "id": {"type": "number"},
                "name": {"type": "string"},
                "price": {"type": "number"},
                "stock": {"type": "number"},
                "category": {"type": "string"}
            }
        }
        
        # Act
        response = requests.get(f"{self.BASE_URL}/api/products/1", headers=self.headers)
        data = response.json()
        
        # Assert
        try:
            validate(instance=data, schema=schema)
        except ValidationError as e:
            pytest.fail(f"Schema validation failed: {e.message}")


class TestAPIPerformance:
    """Testes de performance da API"""
    
    BASE_URL = "https://api.exemplo.com"
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Fixture para obter token de autenticação"""
        payload = {"email": "usuario@exemplo.com", "password": "senha123"}
        response = requests.post(f"{self.BASE_URL}/auth/login", json=payload)
        self.token = response.json()["token"]
        self.headers = {"Authorization": f"Bearer {self.token}"}
    
    def test_tempo_resposta_listar_produtos(self):
        """
        Teste: Validar tempo de resposta ao listar produtos
        Resultado esperado: Resposta em menos de 500ms
        """
        # Act
        start_time = time.time()
        response = requests.get(f"{self.BASE_URL}/api/products", headers=self.headers)
        end_time = time.time()
        
        # Assert
        assert response.status_code == 200
        
        response_time_ms = (end_time - start_time) * 1000
        assert response_time_ms < 500, f"Tempo de resposta {response_time_ms:.2f}ms excede o limite de 500ms"
    
    def test_carga_multiplas_requisicoes(self):
        """
        Teste: Simular carga com múltiplas requisições
        Resultado esperado: API deve responder todas as requisições com sucesso
        """
        # Arrange
        num_requests = 10
        
        # Act
        responses = []
        start_time = time.time()
        
        for _ in range(num_requests):
            response = requests.get(f"{self.BASE_URL}/api/products", headers=self.headers)
            responses.append(response)
        
        end_time = time.time()
        total_time = end_time - start_time
        
        # Assert
        success_count = sum(1 for r in responses if r.status_code == 200)
        assert success_count == num_requests, f"Apenas {success_count}/{num_requests} requisições bem-sucedidas"
        
        avg_time = (total_time / num_requests) * 1000
        print(f"\nTempo médio por requisição: {avg_time:.2f}ms")
        print(f"Tempo total: {total_time:.2f}s")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--html=report.html"])
