# Use an node 8 runtime as a parent image
FROM node:8.14.0-jessie

# Set the working directory to /server
WORKDIR /usr/client

# copy the client sources
# node_modules will be ignore because of .dockerignore file
COPY . .
RUN npm install --quiet
