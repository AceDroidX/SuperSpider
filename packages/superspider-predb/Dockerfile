FROM node:16-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.1.7 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline ; exit 0
RUN pnpm run -F superspider-shared build && pnpm run -F superspider-predb build

FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.1.7 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY . ./
COPY --from=build /app/packages/superspider-shared/dist/ ./packages/superspider-shared/dist/
COPY --from=build /app/packages/superspider-predb/dist/ ./packages/superspider-predb/dist/
RUN pnpm install --offline --prod ; exit 0
ENTRYPOINT ["pnpm","run","-F","superspider-predb","start"]
