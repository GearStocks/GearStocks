FROM node:latest

COPY ./ /home/files

RUN yarn install &&\
 npm install -g expo-cli --unsafe &&\
 npm install -g turtle-cli --unsafe

CMD cd turtle &&\
 openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes &&\
 ./simple-https-server.py &>/dev/null &&\
 cd .. &&\
 npx expo login -u $EXPO_CLI_USER -p $EXPO_CLI_PASSWORD &&\
 npx expo publish --non-interactive --release-channel deployment &&\
 turtle setup:android &&\
 turtle build:android -u $EXPO_CLI_USER -p $EXPO_CLI_PASSWORD -t apk -o /home/apk --public-url https://localhost:4443