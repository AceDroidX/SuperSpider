ARG IMAGE_TAG=master

FROM node:18-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@8.6.6 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline
RUN pnpm run -F superspider-shared build && pnpm run -F superspider-mdb build

FROM acedroidx/superspider-shared:${IMAGE_TAG}
COPY --from=build /app/packages/superspider-mdb/dist/ ./packages/superspider-mdb/dist/
ENTRYPOINT ["pnpm","run","-F","superspider-mdb","start"]
