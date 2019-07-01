FROM openjdk:8

ENV SDK_URL="https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip" \
ANDROID_HOME="/usr/local/android-sdk" \
ANDROID_VERSION=28 \
ANDROID_BUILD_TOOLS_VERSION=26.0.2

# Download Android SDK
RUN mkdir "$ANDROID_HOME" /root/.android &&\
touch /root/.android/repositories.cfg &&\
cd "$ANDROID_HOME" &&\
curl -o sdk.zip $SDK_URL &&\
unzip sdk.zip &&\
rm sdk.zip &&\
yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses &&\
echo "Updating, this could take a moment." &&\
$ANDROID_HOME/tools/bin/sdkmanager --update &&\
$ANDROID_HOME/tools/bin/sdkmanager "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" "platforms;android-${ANDROID_VERSION}" "platform-tools" &&\
mkdir /application

COPY '.' '/application/'

WORKDIR /application

CMD ["sh", "-c", "./gradlew clean && ./gradlew assembleRelease && mv ./app/build/outputs/apk/release/app-release-unsigned.apk /home/apk/client.apk"]