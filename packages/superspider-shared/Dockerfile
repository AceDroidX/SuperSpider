FROM node:18-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@8.6.6 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline
RUN pnpm run -F superspider-shared build

FROM node:18-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@8.6.6 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY . ./
COPY --from=build /app/packages/superspider-shared/dist/ ./packages/superspider-shared/dist/
RUN pnpm install --offline --prod
