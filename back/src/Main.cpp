#include "stdio.h"
#include "pistache/endpoint.h"
#include "pistache/router.h"
#include "pistache/http.h"
#include "rapidjson/document.h"
#include "../include/Server.hpp"
#include "../include/BddManager.hpp"
#include "../include/Emailer.hpp"
#include <iostream>

int main(int argc, char *argv[]) {
  int portEnv;
  
  try {
    portEnv = std::stoi(argv[1]);
  } catch(std::exception e) {
    std::cout << e.what() << ": Please make sure you provide a valid port as first argument." << std::endl;
    return 1;
  }
  
  Pistache::Port port(portEnv);
  Pistache::Address addr(Pistache::Ipv4::any(), port);
  BddManager	*manager = new BddManager();
  Emailer	*emailer = new Emailer();
  Server gearStockServ(addr, manager, emailer);
  
  std::cout << "listening on : " << port << std::endl;
  gearStockServ.start();
  
  gearStockServ.shutdown();
}
