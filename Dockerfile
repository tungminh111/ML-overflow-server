# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY "package.json" .
RUN npm install
EXPOSE 8080
COPY "src" ./src
COPY ".env" .
CMD [ "npm", "run", "dev" ]