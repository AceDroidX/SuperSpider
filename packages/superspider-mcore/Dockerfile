ARG IMAGE_TAG=master

FROM node:16-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.9.4 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline ; \
  pnpm run -F superspider-mcore build

FROM acedroidx/superspider-shared:${IMAGE_TAG}
COPY --from=build /app/packages/superspider-mcore/dist/ ./packages/superspider-mcore/dist/
EXPOSE 2162
ENTRYPOINT ["pnpm","run","-F","superspider-mcore","start"]
