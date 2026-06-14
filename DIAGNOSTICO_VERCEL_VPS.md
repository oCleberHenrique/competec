# Diagnostico Vercel x VPS - Competec

Este arquivo resume o estado encontrado para continuar a investigacao em outra maquina.

## Situacao atual

- O repositorio esta integrado com a Vercel e os pushes do GitHub estao sendo reconhecidos.
- O frontend e um projeto Next.js dentro da pasta `frontend/`.
- O backend e um projeto Django dentro da pasta `backend/`.
- O arquivo `docker-compose.prod.yml` indica uma arquitetura pensada para VPS/Docker, com backend, banco Postgres e frontend.
- A Vercel deve hospedar apenas o frontend.
- A VPS deve continuar hospedando backend, banco, media/admin e API.

## Sintoma

O site publicado na Vercel abre, mas fica branco ou em carregamento eterno.

Isso acontece porque a home do frontend depende da API:

```text
https://api.v4jasson.com.br/api/home-data/
```

No codigo atual, se essa API falhar, a pagina nao mostra erro visual:

```tsx
if (loading) return null;
if (!data) return null;
```

Entao qualquer falha de API, CORS, DNS, proxy, backend parado ou banco travado resulta em tela branca.

## Evidencias encontradas

- O dominio que resolveu para Vercel foi:

```text
https://competec.v4jasson.com.br
```

- O dominio abaixo nao resolveu DNS durante o teste:

```text
https://competec.competec.v4jasson.com.br
```

- O dominio da VPS citado respondeu:

```text
https://plataforma.grupocompetec.com.br
```

- A API usada pelo frontend ficou sem responder no teste:

```text
https://api.v4jasson.com.br/api/home-data/
```

## Causa mais provavel

O frontend da Vercel nao esta conseguindo puxar os dados da API/VPS.

O push chegou na Vercel, mas a aplicacao depende do backend para renderizar a home. Como a chamada para `home-data` nao responde, o frontend fica vazio.

## O que verificar na Vercel

1. Em `Settings > General`, confirmar:

```text
Root Directory: frontend
```

2. Em `Settings > Environment Variables`, confirmar:

```text
NEXT_PUBLIC_API_URL=https://api.v4jasson.com.br
```

3. Depois de alterar `NEXT_PUBLIC_API_URL`, fazer redeploy.

Variaveis `NEXT_PUBLIC_*` entram no build do Next.js. Se mudar a variavel e nao fizer redeploy, o frontend publicado pode continuar usando o valor antigo.

## O que verificar na VPS/API

1. Testar no navegador ou terminal:

```text
https://api.v4jasson.com.br/api/home-data/
```

O esperado e retornar JSON. Se nao retornar JSON, o frontend nao vai montar a home.

2. Verificar se o backend Django esta rodando.

3. Verificar logs do backend/Gunicorn.

4. Verificar se o banco Postgres esta rodando e acessivel.

5. Verificar se o Nginx/proxy esta roteando corretamente:

```text
/api/ -> backend Django
/media/ -> arquivos de media
/admin/ -> Django admin
```

6. Verificar DNS do dominio:

```text
api.v4jasson.com.br
```

Ele precisa apontar para o servidor correto onde a API esta rodando.

7. Verificar CORS no Django.

No `backend/config/settings.py`, incluir o dominio real do frontend publicado na Vercel em `CORS_ALLOWED_ORIGINS`, por exemplo:

```text
https://competec.v4jasson.com.br
```

Se for usar outro dominio, ele tambem precisa entrar na lista.

## Recomendacao

Nao apagar a VPS ainda.

O caminho mais seguro e:

1. Manter a VPS com backend, banco, media e admin.
2. Manter a Vercel com o frontend.
3. Corrigir a conexao Vercel -> API/VPS.
4. Ajustar o frontend para mostrar uma mensagem de erro quando a API falhar, em vez de tela branca.

## Melhoria recomendada no codigo

Trocar os retornos vazios da home por algum estado visual de erro ou fallback.

Hoje:

```tsx
if (loading) return null;
if (!data) return null;
```

Melhor:

```tsx
if (loading) return <main>Carregando...</main>;
if (!data) return <main>Nao foi possivel carregar os dados do site.</main>;
```

Isso nao corrige a API, mas evita que o problema fique invisivel.

