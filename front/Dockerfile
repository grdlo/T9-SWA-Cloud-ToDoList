FROM node:12-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

## INSTALL ALL DEPENDENCIES

COPY package.json /usr/app/package.json
RUN npm install --silent

## COPY SOURCES

COPY src /usr/app/src
COPY public /usr/app/public

EXPOSE 3000
CMD ["npm", "start"]
