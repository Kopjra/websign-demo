FROM node:12-alpine

ARG ARG_NPM_TOKEN
ENV NPM_TOKEN=${ARG_NPM_TOKEN}

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080

CMD [ "sh", "-c", "npm run ${NPM_SCRIPT_TO_RUN}" ]