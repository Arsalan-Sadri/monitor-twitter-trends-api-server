FROM node:14.15.3
#ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

CMD [ "npm", "start" ]