# Stage 1: Build TypeScript source code
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json server.ts ./
COPY src ./src

# Compile TypeScript to dist/ and strip build-only packages for a minimal production layer
RUN npm run build && \
    npm uninstall typescript @types/node @types/express @types/cors @types/cookie-parser @types/bcryptjs @types/jsonwebtoken @types/morgan && \
    npm prune --omit=dev && \
    npm cache clean --force

# Stage 2: Lean production runtime
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist

RUN mkdir -p /app/uploads /app/logs && chown -R node:node /app/uploads /app/logs

USER node

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "dist/server.js"]
