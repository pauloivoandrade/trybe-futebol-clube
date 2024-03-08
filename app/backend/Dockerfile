FROM node:14-alpine

WORKDIR /app-backend

COPY . .

EXPOSE 3001

RUN npm install

ENTRYPOINT [ "npm", "run", "dev"]