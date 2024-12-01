FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]