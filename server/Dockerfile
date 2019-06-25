# Use an node 8 runtime as a parent image
FROM node:8.14.0-jessie

# Set environment variable: server port as 3002
ENV AUTH_SECRET=vHJcV7

# Set the working directory to /server
WORKDIR /server

# Create app directory
#WORKDIR /usr/app

# install node package
#COPY package.json .
#RUN npm install --quiet

COPY . .
RUN npm install --quiet
