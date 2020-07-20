FROM debian:stretch

RUN apt -y update &&\
 apt -y upgrade &&\
 apt -y install certbot python-certbot-apache

#CMD certbot --apache --email valentin.lebon@epitech.eu --agree-tos -d images.gearstocks.store -d dev.gearstocks.store -d api.gearstocks.store -d gearstocks.store; chmod -R 755 /etc/letsencrypt