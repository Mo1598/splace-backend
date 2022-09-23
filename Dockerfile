FROM node:14.17-alpine AS staging

ARG NODE_ENV=staging

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/splace/src

COPY package*.json ./

RUN npm install -g typeorm

RUN npm install -g @nestjs/cli

RUN npm install --only=development

COPY . .

RUN npm run build
