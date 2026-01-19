# Usa a imagem oficial do UV com Python
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

# --- A MUDANÇA ESTÁ AQUI ---
# Força o uv a instalar as bibliotecas (Django, etc.) diretamente no sistema
# Isso elimina a necessidade de ativar ambiente virtual (.venv)
ENV UV_PROJECT_ENVIRONMENT="/usr/local"
ENV UV_COMPILE_BYTECODE=1

# Configurações padrão do Python para Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instala dependências do sistema operacional
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copia os arquivos de configuração de dependências
COPY pyproject.toml uv.lock* /app/

# Instala as dependências do projeto DIRETO no sistema
RUN uv sync --frozen --no-install-project || uv sync --no-install-project

# Copia todo o código do projeto
COPY . /app

# Garante permissão de execução (se houver script de entrada)
RUN if [ -f entrypoint.sh ]; then chmod +x entrypoint.sh; fi