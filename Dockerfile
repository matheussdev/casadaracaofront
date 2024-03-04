FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV VITE_API_URL=https://aplicativo-api-production.up.railway.app

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]