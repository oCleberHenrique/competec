FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

WORKDIR /app

# Instala dependências do sistema necessárias para compilar pacotes Python (se houver)
RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    && rm -rf /var/lib/apt/lists/*

# Copia arquivos de dependência
COPY pyproject.toml uv.lock* /app/

# Instala dependências via uv no ambiente do sistema
RUN uv sync --frozen --no-install-project || uv sync --no-install-project

# Adiciona o venv ao PATH (caso o uv crie um, mas o comando acima instala no system)
ENV PATH="/app/.venv/bin:$PATH"

COPY . /app

# O comando default será sobrescrito pelo compose, mas deixamos um fallback
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]