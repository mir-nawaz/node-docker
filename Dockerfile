# install latest node
# https://hub.docker.com/_/node/
FROM node:15.11.0

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# create and set app directory
RUN mkdir -p /opt/server
WORKDIR /opt/server

COPY package.json yarn.lock ./
RUN yarn install --no-optional && yarn cache clean --force

ENV PATH /opt/server/node_modules/.bin:$PATH
WORKDIR /opt/server/app

COPY . .

HEALTHCHECK --interval=10s --timeout=10s --start-period=10s --retries=3 CMD yarn healthz

CMD yarn prod

# expose container port
EXPOSE 8080
