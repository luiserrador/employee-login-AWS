FROM node:18-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .
RUN npm install

# add app
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80

COPY --from=builder /app/build usr/share/nginx/html