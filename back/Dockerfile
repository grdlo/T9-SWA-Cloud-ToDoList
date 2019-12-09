FROM node:12-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

## INSTALL ALL DEPENDENCIES

COPY package.json /usr/app/package.json
RUN npm install --silent

## COPY SOURCES

COPY src /usr/app/src

EXPOSE 8080
CMD ["npm", "start"]
