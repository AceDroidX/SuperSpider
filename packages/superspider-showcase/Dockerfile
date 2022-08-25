ARG IMAGE_TAG=master

FROM node:16-alpine AS build
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN npm install -g pnpm@7.9.4 && npm cache clean --force
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm install --offline ; \
  pnpm run -F superspider-showcase build

FROM acedroidx/superspider-shared:${IMAGE_TAG}
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA
COPY --from=build /app/packages/superspider-showcase/dist/ ./packages/superspider-showcase/dist/
COPY --from=build /app/packages/superspider-showcase/.nuxt/ ./packages/superspider-showcase/.nuxt/
EXPOSE 2164
ENTRYPOINT ["pnpm","run","-F","superspider-showcase","start"]
