FROM node:18-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@5.0.1 -g

# add app
COPY . ./

EXPOSE 8080

# start app
CMD ["npm", "start"]