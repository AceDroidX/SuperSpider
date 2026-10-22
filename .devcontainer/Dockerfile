FROM node:24.2-alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
    && apk update && apk add --no-cache \
    git \
    bash \
    procps \
    ripgrep \
    curl \
    wget \
    nano \
    sudo \
    && npm config set registry https://registry.npmmirror.com/ \
    && npm install -g pnpm@10.12.1 @openai/codex

RUN printf 'node ALL=(ALL) NOPASSWD: ALL\n' > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node \
    && visudo -cf /etc/sudoers

ENV CODEX_HOME=/codex

USER node
