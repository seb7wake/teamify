FROM node:17.3.1

WORKDIR /web

COPY package.json yarn.lock ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]