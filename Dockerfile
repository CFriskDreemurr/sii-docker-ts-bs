FROM node:14 as base

WORKDIR /usr/src

COPY package*.json .

RUN npm i

COPY . .

CMD ["npm", "start"]