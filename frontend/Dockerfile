FROM oven/bun:latest AS base
WORKDIR /app

# ── Development stage ────────────────────────────────────────────────────────
FROM base AS development

COPY package.json bun.lock ./
RUN bun install

COPY . .

EXPOSE 5173
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]

# ── Build stage ───────────────────────────────────────────────────────────────
FROM base AS build

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# ── Production stage (static files via nginx) ─────────────────────────────────
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
