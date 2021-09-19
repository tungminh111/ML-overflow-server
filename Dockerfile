# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["psql", "createdb mloverflow"]
CMD [ "node", "src/index.js" ]
