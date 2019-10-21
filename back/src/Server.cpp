#include <iostream>
#include "pistache/endpoint.h"
#include "pistache/router.h"
#include "pistache/http.h"
#include <memory>
#include "../include/Server.hpp"
#include "../include/BddManager.hpp"
#include "../include/TokenManager.hpp"
#include "rapidjson/document.h"

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
        Pistache::Rest::Routes::Post(router, "/register", Pistache::Rest::Routes::bind(&Server::PostRegister, this));
        Pistache::Rest::Routes::Post(router, "/connect", Pistache::Rest::Routes::bind(&Server::PostConnect, this));
}

int Server::Hello(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
    std::cout << "Hello World" << std::endl;
    response.send(Pistache::Http::Code::Ok, "Hello World");
}

int Server::PostConnect(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response) {
    rapidjson::Document document;
    TokenManager	tokenManager;
    std::string token = tokenManager.generateToken();
    size_t	i = 3;
    
    document.Parse(request.body().c_str());
    i = _manager->userConnect(document["username"].GetString(), document["password"].GetString(), token);
    if (i == 0) {
      std::cout << token << std::endl;
      response.send(Pistache::Http::Code::Ok, token);
    }
    else if (i == 1)
	response.send(Pistache::Http::Code::Bad_Request, "Bad Password");
    else if (i == 2)
      response.send(Pistache::Http::Code::Bad_Request, "User doesn't exist");
    else
      response.send(Pistache::Http::Code::Internal_Server_Error, "Error occured");
}

int Server::PostRegister(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
    //parsing json
    rapidjson::Document document;
    size_t	i = 3;
    
    document.Parse(request.body().c_str());
    //appel function BDD
    i = _manager->userRegister(document["username"].GetString(), document["password"].GetString(), document["mail"].GetString());
    if (i == 0)
      response.send(Pistache::Http::Code::Ok, "");
    else if (i == 1)
      response.send(Pistache::Http::Code::Bad_Request, "User already exist");
    else if (i == 2)
      response.send(Pistache::Http::Code::Bad_Request, "Mail already usead");
    else
      response.send(Pistache::Http::Code::Internal_Server_Error, "Error occured");
    return 0;
}

int Server::GetRegister(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
    Pistache::Http::serveFile(response, "./src/test.html");
    //response.send(Pistache::Http::Code::Ok, "test");
    return 0;
}
