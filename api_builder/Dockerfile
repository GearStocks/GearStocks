FROM gearstocks/api_builder:latest

RUN ldconfig -v

CMD cd /home/files && mkdir -p build && cd build && cmake .. && make &&\
  mkdir -p /home/lib/ && mkdir -p /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libcrypto* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libssl* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libsasl* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libstdc++* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/x86_64-linux-gnu/libcurl* /home/lib/x86_64-linux-gnu/ &&\
  cp --remove-destination /usr/lib/libmongo* /home/lib/ &&\
  cp --remove-destination /usr/lib/libbson* /home/lib/