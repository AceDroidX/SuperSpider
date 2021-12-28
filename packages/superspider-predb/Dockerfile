FROM node:16-alpine
WORKDIR /app
ENV TZ=Asia/Shanghai
COPY package.json tsconfig.json /app/
RUN ls -al\
  && npm --registry https://registry.npmmirror.com install
COPY src/ /app/src/
# COPY config/ /app/config/
RUN npm run build
CMD ["npm","run","start"]