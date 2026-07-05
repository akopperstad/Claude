# Vøling web — built from the REPO ROOT so pipeline/ is in context:
#   docker build -f fasade/web/Dockerfile .
# (fly.toml sets this up automatically)

FROM node:22-alpine AS build
WORKDIR /repo
COPY fasade/pipeline ./fasade/pipeline
COPY fasade/web ./fasade/web
WORKDIR /repo/fasade/web
RUN npm ci
RUN npm run build

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
# standalone output keeps repo-root layout: fasade/web/server.js
COPY --from=build /repo/fasade/web/.next/standalone ./
COPY --from=build /repo/fasade/web/.next/static ./fasade/web/.next/static
COPY --from=build /repo/fasade/web/public ./fasade/web/public
# projects/renders/quota/leads/telemetry live here — mount a volume
RUN mkdir -p /app/fasade/web/data
VOLUME /app/fasade/web/data
WORKDIR /app/fasade/web
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
