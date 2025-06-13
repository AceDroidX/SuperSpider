FROM node:24.2-alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
    && apk update && apk add --no-cache \
    git \
    curl \
    wget \
    nano \
    && npm config set registry https://registry.npmmirror.com/ \
    && npm install -g pnpm@10.12.1
