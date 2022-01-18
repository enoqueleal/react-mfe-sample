# Imagem de Origem
FROM node:14.15-alpine AS build

EXPOSE 3000
WORKDIR /bindmount

COPY ./ ./
RUN npm install --no-progress --ignore-optional
CMD npm run start-mfe