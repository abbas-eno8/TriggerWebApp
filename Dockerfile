####  Stage 1: Define base image and build the code ####
FROM node:16-alpine AS build
LABEL author="abbas0324"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force
COPY . .
RUN npm run build

#### Stage2: Run the code ####
FROM nginx:1.18.0-alpine
VOLUME /var/cache/nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

# docker build -t triggerwebapp-local -f nginx.dockerfile .
# docker run -p 8080:80 triggerwebapp-local


# docker build -t triggerwebapp .
# docker run --rm --net triggerredevelopbridge --name triggerwebapp -p 8080:80 -d triggerwebapp:latest

# docker build -t triggerwebapp .
# docker run --rm --net triggerredevelopbridge --name triggerwebapp -p 8080:8080 -d triggerwebapp:latest


# docker build -t triggerwebapplocal .
# docker run --rm --net triggerredevelopbridge --name triggerwebapplocal -p 8080:80 -d triggerwebapplocal:latest
