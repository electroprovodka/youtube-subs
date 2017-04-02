FROM node:6.9

# Create app directory
RUN mkdir -p /app/frontend
WORKDIR /app/frontend

# to make npm test run only once non-interactively
# ENV CI=true

# Bundle app source
COPY . /app/frontend
RUN npm install && \
    npm install -g pushstate-server

# Build and optimize react app
# RUN npm run build

EXPOSE 3000

# defined in package.json
CMD [ "npm", "start" ]
