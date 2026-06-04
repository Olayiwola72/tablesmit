FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx vite build

FROM nginx:alpine AS serve
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

LABEL org.opencontainers.image.title="Tablesmit"
LABEL org.opencontainers.image.description="A minimalist table builder for analytical writing"
LABEL org.opencontainers.image.url="https://tablesmit.com"
LABEL org.opencontainers.image.source="https://github.com/Olayiwola72/tablesmit"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.version="1.2.3"
