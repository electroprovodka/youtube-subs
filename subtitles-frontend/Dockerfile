FROM node:6.9

WORKDIR /app

COPY package.json /app

# Bundle app source
RUN npm install && \
    npm install -g pushstate-server

COPY . /app
# RUN npm run build

EXPOSE 3000

# defined in package.json
CMD [ "npm", "start" ]
