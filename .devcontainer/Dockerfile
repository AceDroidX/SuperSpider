FROM node:18-slim

RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    nano \
    && rm -rf /var/lib/apt/lists/*
