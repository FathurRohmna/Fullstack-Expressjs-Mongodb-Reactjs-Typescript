FROM node:14.15.3-alpine3.12

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
