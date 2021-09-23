# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"] .
RUN npm install
COPY . ./
EXPOSE 8080
CMD ["psql", "createdb mloverflow"]
CMD [ "npm", "run", "dev" ]