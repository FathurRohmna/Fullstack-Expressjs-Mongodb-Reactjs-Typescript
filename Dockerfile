# Build admin client

FROM node:14.15.3-alpine3.12 as client

WORKDIR /usr/app/client

COPY client/package*.json ./

RUN yarn

COPY client/ ./
RUN ls

RUN yarn build

# Build server

FROM node:14.15.3-alpine3.12

WORKDIR /usr/src/app/

COPY --from=client /usr/app/client/build/ ./client/build/
RUN ls

WORKDIR /usr/src/app/server/
COPY server/package*.json ./
RUN yarn add -qy
COPY server/ ./

ENV PORT 8080

EXPOSE 8080

CMD ["yarn", "start"]
