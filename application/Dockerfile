FROM java:8-jdk as java

FROM node:latest

COPY --from=java $JAVA_HOME $JAVA_HOME

COPY ./ /home/files

WORKDIR /home/files

RUN npm install -g expo-cli --unsafe &&\
 npm install -g turtle-cli --unsafe &&\
 npm install && npm audit fix


CMD cd turtle &&\
 openssl req -new -x509 -keyout server.pem -out server.pem -days 1 -nodes -subj "/C=FR/ST=Paris/L=Paris/O=/OU=/CN=localhost" &&\
 python3 https.py &>/dev/null &&\
 cd /home/files &&\
 expo login -u $EXPO_CLI_USERNAME -p $EXPO_CLI_PASSWORD &&\
 expo export --dev --public-url https://localhost:4443 &&\
 turtle setup:android &&\
 turtle build:android -u $EXPO_CLI_USERNAME -p $EXPO_CLI_PASSWORD -t apk -o /home/apk --public-url https://localhost:4443