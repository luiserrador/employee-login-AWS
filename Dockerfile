FROM node:18-alpine

# install aws cli
RUN apt update -y
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" -y
RUN unzip awscliv2.zip
RUN sudo ./aws/install

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]