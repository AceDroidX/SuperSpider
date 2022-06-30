FROM node:16-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.1.7 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline ; \
  pnpm run -F superspider-showcase build

FROM node:16-alpine
WORKDIR /app
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.1.7 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY . ./
COPY --from=build /app/packages/superspider-showcase/dist/ ./packages/superspider-showcase/dist/
COPY --from=build /app/packages/superspider-showcase/.nuxt/ ./packages/superspider-showcase/.nuxt/
RUN pnpm install --offline --prod ; exit 0
EXPOSE 2164
ENTRYPOINT ["pnpm","run","-F","superspider-showcase","start"]
