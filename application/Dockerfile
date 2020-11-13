FROM java:8-jdk as java

FROM node:latest

COPY --from=java $JAVA_HOME $JAVA_HOME

COPY ./ /home/files

WORKDIR /home/files

RUN npm install -g expo-cli --unsafe && echo "1" &&\
 npm install -g turtle-cli --unsafe && echo "2" &&\
 npm install && npm audit fix && echo "3"

CMD openssl req -new -x509 -keyout server.pem -out server.pem -days 1 -nodes -subj "/C=FR/ST=Paris/L=Paris/O=/OU=/CN=localhost" &&\
 python3 https.py &>/dev/null &&\
 expo export --public-url https://127.0.0.1/dist &&\
 turtle setup:android &&\
 NODE_TLS_REJECT_UNAUTHORIZED=0 turtle build:android -t apk -o /home/apk/gearstocks.apk --public-url https://127.0.0.1/dist/android-index.json