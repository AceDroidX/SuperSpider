FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
COPY package.json tsconfig.json /app/
RUN ls -al\
    && npm --registry https://registry.npmmirror.com install
COPY ./ /app/
# COPY config/ /app/config/
RUN npm run build
EXPOSE 2164
ENTRYPOINT npm run start