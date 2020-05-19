FROM node:latest

RUN apt -y update &&\
 apt -y upgrade &&\
 npm i -g npm@latest &&\
 npm i -g @angular/cli

WORKDIR /home/files

#--project=admin is the sub-application (backoffice) // --base-href is to help Angular to find scripts through the arborescence
# && ng build --prod --project=admin --base-href /admin/
CMD npm i -no-bin-links && npm audit fix -no-bin-links --force && ng build --prod
#-no-bin-links is to prevent npm from creating symlink. Useful when running docker on windows environments.