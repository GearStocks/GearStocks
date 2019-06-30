#include <iostream>
#include "pistache/endpoint.h"
#include "pistache/router.h"
#include "pistache/http.h"
#include <memory>
#include "../include/Server.hpp"
#include "../include/BddManager.hpp"

Server::Server(Pistache::Address addr, BddManager *manager){
    httpEndpoint = std::make_shared<Pistache::Http::Endpoint>(addr);
    _manager = manager;
    setupRoutes();
}

Server::~Server(){
}

void Server::start(){
    httpEndpoint->setHandler(router.handler());
    httpEndpoint->serve();
}

void Server::shutdown(){
    httpEndpoint->shutdown();
}

void Server::setupRoutes() {
        Pistache::Rest::Routes::Get(router, "/", Pistache::Rest::Routes::bind(&Server::Hello, this));
        Pistache::Rest::Routes::Get(router, "/register", Pistache::Rest::Routes::bind(&Server::GetRegister, this));
}

int Server::Hello(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
    std::cout << "Hello World" << std::endl;
    //parsing json
    //appel function BDD
    std::string username = "User1";
    std::string password = "1234";
    std::string mail = "azerty@gmail.com";
    _manager->userRegister(username, password, mail);
    response.send(Pistache::Http::Code::Ok, "Hello World");
    return 0;
}

int Server::GetRegister(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
    Pistache::Http::serveFile(response, "./src/test.html");
    //response.send(Pistache::Http::Code::Ok, "test");
    return 0;
}
