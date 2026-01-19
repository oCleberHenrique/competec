# Usa a imagem oficial do UV com Python
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

# --- A MÁGICA ESTÁ AQUI ---
# Adiciona o ambiente virtual ao PATH do sistema
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Instala dependências do sistema necessárias para o Django/Postgres
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copia os arquivos de configuração de dependências
COPY pyproject.toml uv.lock* /app/

# Instala as dependências do Python dentro da pasta .venv
RUN uv sync --frozen --no-install-project || uv sync --no-install-project

# Copia todo o código do projeto para dentro do container
COPY . /app

# Garante que o script de entrada (se houver) tenha permissão de execução
RUN if [ -f entrypoint.sh ]; then chmod +x entrypoint.sh; fi