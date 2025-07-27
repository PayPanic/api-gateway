FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 9231
CMD ["node", "--inspect=0.0.0.0:9231", "src/app.js"]