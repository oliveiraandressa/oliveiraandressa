# ⚡ Performance Testing

Esta pasta contém exemplos de testes de performance e carga utilizando diferentes ferramentas.

## 📂 Conteúdo

### 1. JMeter Test Plans
Planos de teste de carga e performance com Apache JMeter.

### 2. K6 Scripts
Scripts de performance testing com K6.

### 3. Performance Reports
Relatórios e análises de testes de performance.

## 🎯 Tipos de Testes

- **Load Testing** - Validação de comportamento sob carga normal
- **Stress Testing** - Identificação do ponto de quebra do sistema
- **Spike Testing** - Comportamento com picos súbitos de carga
- **Endurance Testing** - Performance ao longo do tempo
- **Scalability Testing** - Capacidade de escalar recursos

## 🛠️ Ferramentas

- Apache JMeter
- K6 (Grafana)
- Locust
- Gatling

## 📊 Métricas Monitoradas

- ⏱️ Tempo de resposta (avg, min, max, p90, p95, p99)
- 🚀 Throughput (requisições por segundo)
- ❌ Taxa de erro
- 🔄 Concorrência
- 💾 Uso de recursos (CPU, memória, rede)

## 📈 Cenários de Teste

### Carga Normal
- 100 usuários simultâneos
- Duração: 5 minutos
- Ramp-up: 1 minuto

### Teste de Stress
- 500+ usuários simultâneos
- Aumentar carga gradualmente
- Identificar ponto de quebra

### Teste de Pico
- Variação súbita de 100 para 1000 usuários
- Validar recuperação do sistema

## 🎯 Critérios de Aceitação

- Tempo de resposta médio < 1s
- P95 < 2s
- P99 < 3s
- Taxa de erro < 1%
- Throughput mínimo: 100 req/s
