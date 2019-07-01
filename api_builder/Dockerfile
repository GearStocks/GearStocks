FROM debian:stretch

# build latest cmake

ARG cmake_sources="https://cmake.org/files/v3.8/cmake-3.8.0.tar.gz"

RUN apt -y update && apt -y upgrade &&\
 apt remove --purge -y cmake &&\
 apt autoremove -y && apt autoclean -y && apt clean &&\
 apt install -y gcc curl build-essential &&\
 cd /opt &&\
 mkdir src &&\
 curl -s $cmake_sources | tar -xz --strip-components=1 -C src &&\
 cd src &&\
 ./bootstrap &&\
 make -j8 &&\
 make install &&\
 cd .. &&\
 rm -rf src

RUN mkdir -p /home/dep

WORKDIR /home/dep

RUN apt -y install libmongoc-1.0-0 git libbson-1.0 libssl-dev libsasl2-dev wget &&\
 wget https://github.com/mongodb/mongo-c-driver/releases/download/1.14.0/mongo-c-driver-1.14.0.tar.gz &&\
 tar xzf mongo-c-driver-1.14.0.tar.gz &&\
 cd mongo-c-driver-1.14.0 &&\
 mkdir cmake-build &&\
 cd cmake-build &&\
 cmake -DENABLE_AUTOMATIC_INIT_AND_CLEANUP=OFF .. &&\
 make &&\
 make install

WORKDIR /home/dep

RUN git clone https://github.com/mongodb/mongo-cxx-driver.git --branch releases/stable --depth 1 &&\
 cd mongo-cxx-driver/build &&\
 cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr/local .. &&\
 make EP_mnmlstc_core &&\
 make &&\
 make install

WORKDIR /home/dep

RUN git clone https://github.com/oktal/pistache.git &&\
 cd pistache &&\
 git submodule update --init &&\
 mkdir build &&\
 cd build &&\
 cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release .. &&\
 make &&\
 make install

WORKDIR /home/dep

RUN git clone https://github.com/Tencent/rapidjson.git &&\
 cp -r rapidjson/include/* /usr/local/include

RUN cp -r /usr/local/* /usr/

CMD cd /home/files && mkdir -p build && cd build && cmake .. && make && cp -r /usr/lib /home && ./App