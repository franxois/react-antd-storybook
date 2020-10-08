FROM node:14

WORKDIR /opt

ADD . .

RUN npm --prefix lib/ui-library ci
RUN npm --prefix lib/ui-library run build
RUN npm ci
RUN ls -alh /opt
RUN ls -alh src
# RUN CI=true npm test
RUN npm run build