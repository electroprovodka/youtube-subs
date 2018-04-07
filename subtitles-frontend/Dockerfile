FROM node:6.9 as frontend

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

# Bundle app source
RUN npm build


FROM nginx:alpine
COPY --from=frontend /app/build /var/www
