# Stage 1

FROM node:8.11.2-alpine as node
WORKDIR /user-library-demo/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2

FROM nginx:1.13.12-alpine
COPY --from=node /user-library-demo/src/app/dist/user-library-demo /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
