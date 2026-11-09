# Plano de Gestão de Configuração de Software (GCS) — TaskFlow Acadêmico

- Projeto: TaskFlow Acadêmico (gerenciador de tarefas acadêmicas: HTML, CSS e JavaScript)
- Repositório: https://github.com/Gustavonecal/Plano-Atividade
- Responsável: @Gustavonecal
- Par de revisão: @GhostBLK
- Versão do plano: 1.0 — 09/11/2026

## 1. Objetivo e escopo

Definir como os itens do projeto são identificados, versionados, revisados e
publicados, de modo que nenhuma alteração chegue à `main` sem Pull Request
revisado por outra pessoa. O plano é aplicado ao repositório acima e é, ele
próprio, um item de configuração.

## 2. Papéis e responsabilidades

| Papel | Quem | Responsabilidades |
|---|---|---|
| Desenvolvedor Líder | @Gustavonecal | Desenvolve, abre os Pull Requests, mantém este plano e aprova a promoção para `production` |
| Revisor (par de revisão) | @GhostBLK | Revisa e aprova os Pull Requests; tem acesso de escrita (Write) ao repositório |

O GitHub não permite aprovar o próprio Pull Request. Por isso a aprovação
sempre vem do par de revisão. Em contrapartida, o autor deste plano revisa os
Pull Requests do projeto do colega.

## 3. Itens de configuração

| Item | Caminho | Finalidade |
|---|---|---|
| Código-fonte | `index.html`, `app.js`, `styles.css` | Aplicação |
| Plano de GCS | `docs/plano-gcs.md` | Este documento |
| README | `README.md` | O que o app faz, tecnologias, como rodar |
| Histórico de mudanças | `CHANGELOG.md` | Registro das versões |
| Regras de exclusão | `.gitignore` | Evita versionar arquivos locais e segredos |
| Normalização de linhas | `.gitattributes` | `* text=auto eol=lf` |
| Variáveis de ambiente | `.env.example` | Apenas os nomes, nunca valores reais |
| Modelo de Pull Request | `.github/pull_request_template.md` | Padroniza a revisão |
| Revisores automáticos | `.github/CODEOWNERS` | Chama o par de revisão em todo PR |
| Modelos de Issue | `.github/ISSUE_TEMPLATE/` | Padroniza pedidos de funcionalidade e defeitos |

Observações:
- O projeto não usa gerenciador de pacotes, portanto não há arquivo de
  dependências (lockfile). Se alguma dependência for adicionada, o lockfile
  correspondente passa a ser item de configuração.
- Segredos (senhas, tokens, chaves) nunca são versionados. Se forem
  necessários, usa-se GitHub Secrets.

## 4. Branches e commits

- A `main` é a única branch permanente e representa a versão estável.
- Todo trabalho acontece em branches curtas: `feature/<issue>-<descricao>`
  ou `fix/<issue>-<descricao>`.
- Mensagens de commit e títulos de Pull Request seguem Conventional Commits
  (`feat:`, `fix:`, `docs:`, `chore:`).
- Os merges são feitos somente por **squash merge**, de modo que cada Pull
  Request vira um único commit na `main`, com o título do PR como mensagem.
- Branches são apagadas automaticamente após o merge.

## 5. Revisão de Pull Requests

1. O autor abre o PR a partir de uma branch, preenchendo o modelo (contexto,
   decisão tomada, como testar, checklist).
2. O par de revisão é chamado automaticamente pelo CODEOWNERS.
3. É necessária **1 aprovação** antes do merge.
4. Novos commits no PR invalidam aprovações anteriores.
5. Prazo de resposta combinado entre os pares: até 3 dias úteis.

## 6. Proteção da `main`

Regra de proteção ativa na branch `main`:
- Pull Request obrigatório antes do merge, com 1 aprovação.
- Aprovações antigas descartadas quando há novos commits.
- Histórico linear obrigatório.
- Sem exceções: nem o administrador contorna a regra.

Evidência: a tentativa de `git push` direto na `main` é recusada pelo GitHub
(registro em `docs/evidencias/`).

## 7. Ambientes

| Ambiente | Finalidade | Regra de promoção |
|---|---|---|
| `staging` | Validação após o merge | Somente a partir de branches protegidas |
| `production` | Versão entregue | Exige aprovação do revisor obrigatório (@Gustavonecal) |

## 8. Versionamento e histórico

- Versões seguem Versionamento Semântico (MAJOR.MINOR.PATCH).
- `feat` incrementa a versão MINOR, `fix` incrementa a PATCH, e mudanças que
  quebram compatibilidade incrementam a MAJOR.
- Cada versão é registrada no `CHANGELOG.md`.

## 9. Controle de alterações neste plano

Este plano só muda por Pull Request, como qualquer outro item de configuração.

| Versão | Data | Alteração | Autor |
|---|---|---|---|
| 1.0 | 09/11/2026 | Versão inicial | @Gustavonecal |
