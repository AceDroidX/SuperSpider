FROM node:16-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.9.4 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline
RUN pnpm run -F superspider-shared build

FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.9.4 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY . ./
COPY --from=build /app/packages/superspider-shared/dist/ ./packages/superspider-shared/dist/
RUN pnpm install --offline --prod
