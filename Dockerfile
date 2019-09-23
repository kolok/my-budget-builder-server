# Use an node 10 runtime as a parent image
FROM node:10.16.3-jessie

# Set the working directory to /server
WORKDIR /usr/server

# copy the client sources
# node_modules will be ignore because of .dockerignore file
COPY . .
RUN npm install --quiet

# Run nodemon using "npm run watch"
CMD npm run watch
