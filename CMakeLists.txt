cmake_minimum_required(VERSION 3.8)
project(App)

set(CMAKE_CXX_STANDARD 17)
#set(CMAKE_VERBOSE_MAKEFILE on)

set(BUILD_DIR "cmake-build-debug")
set(BUILD_PATH "${CMAKE_SOURCE_DIR}/${BUILD_DIR}")

#set(BUILD_DIR "cmake-build-debug")
#set(BUILD_PATH "${CMAKE_SOURCE_DIR}/${BUILD_DIR}")

#message(STATUS "CMAKE_SOURCE_DIR: ${CMAKE_SOURCE_DIR}")
#message(STATUS "BUILD_PATH: ${BUILD_PATH}")

find_package(libmongocxx REQUIRED)
find_package(libbsoncxx REQUIRED)

message("LIBMONGOCXX_INCLUDE_DIRS = ${LIBMONGOCXX_INCLUDE_DIRS}")
message("LIBMONGOCXX_LIBRARIES = ${LIBMONGOCXX_LIBRARIES}")

message("LIBBSONCXX_INCLUDE_DIRS = ${LIBBSONCXX_INCLUDE_DIRS}")
message("LIBBSONCXX_LIBRARIES = ${LIBBSONCXX_LIBRARIES}")

#message("CRYPTOPP_LIBRARIES = ${CRYPTOPP_LIBRARIES}")

file(GLOB COMMON_LIBRARIES ${LIBMONGOCXX_LIBRARIES} ${LIBBSONCXX_LIBRARIES})

set(SRC
  src/
  src/Main.cpp
  src/BddManager.cpp
  src/Server.cpp
  src/TokenManager.cpp)

set(INC
  include/
  include/BddManager.hpp
  include/Server.hpp
  include/TokenManager.hpp)



add_executable(App ${INC} ${SRC})
target_include_directories(App PUBLIC ${LIBMONGOCXX_INCLUDE_DIRS})
target_include_directories(App PUBLIC ${LIBBSONCXX_INCLUDE_DIRS})
target_link_libraries(App ${LIBMONGOCXX_LIBRARIES} ${LIBBSONCXX_LIBRARIES})

include_directories(/usr/local/include/pistache ./include)
target_link_libraries(App /usr/local/lib/libpistache.a -pthread -lcryptopp)

#target_link_libraries(App cryptopp-static)
