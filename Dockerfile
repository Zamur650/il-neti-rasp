FROM node:20-alpine
LABEL authors="tapnisu"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/
RUN corepack enable && corepack prepare
RUN pnpm install --prod --frozen-lockfile

COPY . /app

CMD [ "pnpm", "run", "start" ]
