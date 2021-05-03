# install latest node
# https://hub.docker.com/_/node/
FROM node:15.11.0

# create and set app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
COPY . .
RUN yarn install

CMD yarn docker

# expose container port
EXPOSE 8080
