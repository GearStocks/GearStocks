#include "stdio.h"
#include "pistache/endpoint.h"
#include "pistache/router.h"
#include "pistache/http.h"
#include "rapidjson/document.h"
#include "../include/Server.hpp"
#include "../include/BddManager.hpp"

int main() {
    Pistache::Port port(8080);
    Pistache::Address addr(Pistache::Ipv4::any(), port);
    BddManager	*manager = new BddManager();
    Server gearStockServ(addr, manager);

    gearStockServ.start();

    gearStockServ.shutdown();
}
