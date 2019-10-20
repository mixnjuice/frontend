FROM nginx:stable

COPY ./dist/ /var/www

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE ${FRONTEND_PORT:-3001}

CMD ["nginx -g 'daemon off;'"]

