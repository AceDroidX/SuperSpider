ARG IMAGE_TAG=master

FROM node:24.22.1-alpine AS build
ARG NPM_REGISTRY=https://registry.npmjs.org/
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@12.15.0 --registry="${NPM_REGISTRY}" && npm cache clean --force
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm fetch --registry="${NPM_REGISTRY}"
COPY . ./
RUN pnpm install --offline --frozen-lockfile --registry="${NPM_REGISTRY}" && \
  pnpm run -F superspider-showcase build

FROM node:24.22.1-alpine
WORKDIR /app
ARG GIT_HASH
ENV NUXT_PUBLIC_GIT_HASH=$GIT_HASH
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=2164
COPY --from=build /app/packages/superspider-showcase/.output/ ./
EXPOSE 2164
ENTRYPOINT ["node","./server/index.mjs"]
