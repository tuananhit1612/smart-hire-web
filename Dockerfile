# ═══════════════════════════════════════════════════════════
#  SmartHire Frontend — Dockerfile (Multi-stage + Standalone)
# ═══════════════════════════════════════════════════════════

# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Enable corepack for Next.js and required packages
RUN apk add --no-cache libc6-compat

# Copy package management files
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build Next.js
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Pass build-time variables via ARG (defined in docker-compose.yml)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GITHUB_CLIENT_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GITHUB_CLIENT_ID=$NEXT_PUBLIC_GITHUB_CLIENT_ID

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Production Server
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output and static files (requires output: "standalone" in next.config.ts)
COPY --from=builder /app/public ./public
# Set correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
# Ensure next standalone uses correct hostname inside docker network
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
