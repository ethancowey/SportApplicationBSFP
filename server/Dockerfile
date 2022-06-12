# Docker file to create the node server Docker file made with guidace from Snyk and following this tutorial:
# https://mherman.org/blog/dockerizing-a-react-app/
# pull updated node base image currebtly with no vulnrabilities known to Snyk
FROM node:16.14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]
