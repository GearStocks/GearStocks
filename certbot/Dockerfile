FROM debian:stretch

RUN apt -y update &&\
 apt -y upgrade &&\
 apt -y install certbot python-certbot-apache

#CMD certbot --webroot --non-interactive --email valentin.lebon@epitech.eu --agree-tos -d gearstocks.store; chmod -R 755 /etc/letsencrypt
CMD certbot certonly --webroot --non-interactive --email valentin.lebon@epitech.eu --agree-tos -w /home/files