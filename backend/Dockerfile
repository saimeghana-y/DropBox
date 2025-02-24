FROM node:18-alpine

RUN apk add --no-cache make gcc g++ python3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --build-from-source

COPY . .

EXPOSE 5001

CMD ["npm", "start"] 