FROM gearstocks/api_builder:latest

RUN apt-get remove curl -y

RUN apt-get install libcurl4-openssl-dev -y

RUN apt-get install ca-certificates

CMD cd /home/files && mkdir -p build && cd build && cmake .. && make &&\
  mkdir -p /home/lib/ && mkdir -p /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libcrypto* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libssl* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libsasl* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libstdc++* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libnghttp2* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libidn2* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/librtmp* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libssh* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libpsl* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libcurl* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libgssapi_krb5* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libkrb5.so.3 /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libk5crypto* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/liblber-2.4* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libldap_r-2.4* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libunistring* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libgnutls.so* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libhogweed* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libnettle* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libgmp* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libkrb5support* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /lib/x86_64-linux-gnu/libkeyutils* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libp11-kit.so* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libpsl* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /lib/x86_64-linux-gnu/libidn.so* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libtasn1.so* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libffi.so* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/libmongo* /home/lib/ &&\
  cp --remove-destination /usr/lib/libbson* /home/lib/