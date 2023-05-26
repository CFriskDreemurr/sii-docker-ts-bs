FROM node:14 as base

WORKDIR /usr/app

COPY package*.json .

RUN npm i

COPY . .

CMD ["pm2", "start", "src/ecosystem.config.js"]