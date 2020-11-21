FROM node:lts-alpine as build

ARG API_URL

WORKDIR /usr/src/mixnjuice-frontend

# copy source code to image
COPY . .

RUN npm install

RUN npm run build

FROM nginx

COPY --from=build /usr/src/mixnjuice-frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf