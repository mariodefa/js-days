FROM node:20-alpine3.18

WORKDIR /daysapp

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
