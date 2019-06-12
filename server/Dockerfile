# Use an node 8 runtime as a parent image
FROM node:8.14.0-jessie

# Set environment vaiable: server port as 3002
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




## Copy the current directory contents into the container at /server
#ADD . /server
#
#RUN npm install

# Make port 3000 available to the world outside this container
#EXPOSE 3000

#CMD ["npm", "run", "start"]
