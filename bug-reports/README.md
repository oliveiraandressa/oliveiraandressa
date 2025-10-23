# 🐛 Bug Reports

Esta pasta contém exemplos de relatórios de bugs bem documentados.

## 📂 Conteúdo

Exemplos de bug reports seguindo as melhores práticas da indústria.

## 🎯 Elementos de um Bom Bug Report

### Informações Essenciais
- **Título claro e descritivo**
- **Severidade e Prioridade**
- **Ambiente de teste**
- **Passos para reproduzir**
- **Resultado esperado vs. obtido**
- **Evidências (screenshots, logs, vídeos)**

### Classificação

#### Severidade
- 🔴 **Crítica** - Sistema não funciona, perda de dados
- 🟠 **Alta** - Funcionalidade principal quebrada
- 🟡 **Média** - Funcionalidade secundária com problema
- 🟢 **Baixa** - Problema cosmético, pequeno inconveniente

#### Prioridade
- **P0** - Hotfix imediato
- **P1** - Deve ser corrigido na próxima release
- **P2** - Deve ser corrigido eventualmente
- **P3** - Nice to have

## 📋 Template de Bug Report

```markdown
**ID:** BUG-XXX
**Título:** [Resumo do problema em uma linha]
**Severidade:** Crítica/Alta/Média/Baixa
**Prioridade:** P0/P1/P2/P3
**Status:** Novo/Em Análise/Em Progresso/Resolvido/Fechado
**Ambiente:** Produção/Staging/Dev
**Navegador/Dispositivo:** Chrome 120 / Windows 11
**Encontrado em:** v2.1.0
**Reportado por:** Nome
**Atribuído a:** Nome
**Data:** DD/MM/YYYY

## Descrição
[Descrição detalhada do problema]

## Passos para Reproduzir
1. Passo 1
2. Passo 2
3. Passo 3

## Resultado Esperado
[O que deveria acontecer]

## Resultado Obtido
[O que realmente aconteceu]

## Evidências
- Screenshots
- Logs
- Vídeos

## Informações Adicionais
- Frequência: Sempre/Intermitente/Raro
- Impacto: Número de usuários afetados
- Workaround: Existe solução temporária?
```

## 🔍 Boas Práticas

- ✅ Título descritivo e específico
- ✅ Um bug por report
- ✅ Passos reproduzíveis
- ✅ Evidências visuais
- ✅ Informações técnicas completas
- ✅ Classificação adequada
- ✅ Linguagem clara e objetiva

## 📊 Métricas de Bugs

- Taxa de detecção de defeitos
- Tempo médio de resolução
- Taxa de reincidência
- Distribuição por severidade
- Bugs por módulo/funcionalidade
