ARG IMAGE_TAG=master

FROM node:16-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.22.0 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline ; \
  pnpm run -F superspider-showcase build

FROM node:16-alpine
WORKDIR /app
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=2164
COPY --from=build /app/packages/superspider-showcase/.output/ ./
EXPOSE 2164
ENTRYPOINT ["node","./server/index.mjs"]
