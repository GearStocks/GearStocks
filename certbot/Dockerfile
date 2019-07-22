FROM debian:stretch

RUN apt -y update &&\
 apt -y upgrade &&\
 apt -y install certbot python-certbot-apache

CMD echo certbot OK
#certbot --apache --email valentin.lebon@epitech.eu --agree-tos -d api.gearstocks.com -d gearstocks.com; chmod -R 755 /etc/letsencrypt