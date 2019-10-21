#include "stdio.h"
#include "pistache/endpoint.h"
#include "pistache/router.h"
#include "pistache/http.h"
#include "rapidjson/document.h"
#include "../include/Server.hpp"
#include "../include/BddManager.hpp"
#include <iostream>

int main() {
    Pistache::Port port(9080);
    Pistache::Address addr(Pistache::Ipv4::any(), port);
    BddManager	*manager = new BddManager();
    Server gearStockServ(addr, manager);

    std::cout << "listening on : " << port << std::endl;
    gearStockServ.start();

    gearStockServ.shutdown();
}
