FROM node:18-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

EXPOSE 80

# start app
CMD ["npm", "start"]