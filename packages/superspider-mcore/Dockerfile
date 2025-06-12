ARG IMAGE_TAG=master

FROM node:24.2-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@10.12.1 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline --force
RUN pnpm run -F superspider-shared build && pnpm run -F superspider-mcore build

FROM node:24.2-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
COPY --from=build /app/packages/superspider-mcore/dist/ /app/dist/
EXPOSE 2162
CMD ["node","--enable-source-maps","dist/index.js"]
