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
  shutdown();
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
        Pistache::Rest::Routes::Post(router, "/register", Pistache::Rest::Routes::bind(&Server::PostRegister, this));
	Pistache::Rest::Routes::Options(router, "/register", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
        Pistache::Rest::Routes::Post(router, "/connect", Pistache::Rest::Routes::bind(&Server::PostConnect, this));
	Pistache::Rest::Routes::Options(router, "/connect", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
	Pistache::Rest::Routes::Post(router, "/updateInfoUser", Pistache::Rest::Routes::bind(&Server::UpdateUser, this));
	Pistache::Rest::Routes::Options(router, "/updateInfoUser", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
	Pistache::Rest::Routes::Post(router, "/disconnect", Pistache::Rest::Routes::bind(&Server::disconnect, this));
	Pistache::Rest::Routes::Options(router, "/disconnect", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
	Pistache::Rest::Routes::Post(router, "/infoUser", Pistache::Rest::Routes::bind(&Server::infoUser, this));
	Pistache::Rest::Routes::Options(router, "/infoUser", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
	Pistache::Rest::Routes::Post(router, "/addCarPart", Pistache::Rest::Routes::bind(&Server::addCarPart, this));
	Pistache::Rest::Routes::Post(router, "/getCarPart", Pistache::Rest::Routes::bind(&Server::getCarPart, this));
	Pistache::Rest::Routes::Options(router, "/getCarPart", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
}

int Server::Hello(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
    std::cout << "Hello World" << std::endl;
    response.send(Pistache::Http::Code::Ok, "Hello World. The API is online. Port:8000");
}

int Server::OptionsConnect(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response) {
    response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
    response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
    response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
    response.send(Pistache::Http::Code::Ok, "Options done");
}

int Server::PostConnect(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response) {
    rapidjson::Document document;
    TokenManager	tokenManager;
    std::string token = tokenManager.generateToken();
    size_t	i = 3;

    document.Parse(request.body().c_str());

    response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
    response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
    response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
    if(!document.HasMember("mail")) {
      std::cout << "il manque le champ mail" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'mail'");
      return -1;
    }
    if(!document.HasMember("password")) {
      std::cout << "Il manque le champ password" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'password'");
      return -1;
    }
    if(!document.HasMember("rememberMe")) {
      std::cout << "Il manque le champ rememberMe" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'rememberMe'");
      return -1;
    }
    
   

    i = _manager->userConnect(document["mail"].GetString(), document["password"].GetString(), token);
    if (i == 0) {
      std::cout << token << std::endl;
      _manager->updateDateInBDD(document["mail"].GetString(), _manager->getTime());
      _manager->updateTokenInBDD(document["mail"].GetString(), token);
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
    std::vector<std::string> documentContent;
    rapidjson::Document document;
    size_t	i = 3;

    
    response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
    response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
    response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
    document.Parse(request.body().c_str());
    if(!document.HasMember("username")) {
      std::cout << "Il manque le champ username" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'username'");
      return -1;
    }
    
    if(!document.HasMember("password")) {
      std::cout << "Il manque le champ password" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'password'");
      return -1;
    }
    if(!document.HasMember("mail")) {
      std::cout << "Il manque le champ mail" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'mail'");
      return -1;
    }
    if(!document.HasMember("firstName")) {
      std::cout << "Il manque le champ firstName" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'firstName'");
      return -1;
    }
    if(!document.HasMember("lastName")) {
      std::cout << "Il manque le champ lastName" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'lastName'");
      return -1;
    }
    if(!document.HasMember("birthDay")) {
      std::cout << "Il manque le champ birthDay" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'birthDay'");
      return -1;
    }
 
    documentContent.push_back(document["username"].GetString());
    documentContent.push_back(document["password"].GetString());
    documentContent.push_back(document["mail"].GetString());
    documentContent.push_back(document["firstName"].GetString());
    documentContent.push_back(document["lastName"].GetString());
    documentContent.push_back(document["birthDay"].GetString());
    i = _manager->userRegister(documentContent);

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

int Server::UpdateUser(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
  std::cout << "Update Profil" << std::endl;
  rapidjson::Document document;
  document.Parse(request.body().c_str());

  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");

  if(!document.HasMember("mail")) {
      std::cout << "Il manque le champ mail" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'mail'");
      return -1;
    }
  if(!document.HasMember("oldUsername")) {
      std::cout << "Il manque le champ oldUsername" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'oldUsername'");
      return -1;
    }
  if(!document.HasMember("newUsername")) {
      std::cout << "Il manque le champ newUsername" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'newUsername'");
      return -1;
    }
  if(!document.HasMember("oldPass")) {
      std::cout << "Il manque le champ oldPass" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'oldPass'");
      return -1;
    }
  if(!document.HasMember("newPass")) {
      std::cout << "Il manque le champ newPass" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'newPas'");
      return -1;
    }
  if(!document.HasMember("oldMail")) {
      std::cout << "Il manque le champ oldMail" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'oldMail'");
      return -1;
    }
  if(!document.HasMember("newMail")) {
      std::cout << "Il manque le champ newMail" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'newMail'");
      return -1;
    }
  /*
    if (checkIfExist(document, "mail") == -1 || checkIfExist(document, "oldUsername") == -1 || check \
    IfExist(document, "newUsername") == -1){
    response.send(Pistache::Http::Code::Bad_Request, "");
    return 0;
    }
  */
  _manager->updateNameUser(document["mail"].GetString(), document["oldUsername"].GetString(), document["newUsername"].GetString());
  /*_manager->updatePseudoUser(document["mail"].GetString(), document["newPseudo"].GetString(), do \
    cument["oldPseudo"].GetString());*/
  _manager->updatePasswordUser(document["mail"].GetString(), document["oldPass"].GetString(), document["newPass"].GetString());
  _manager->updateMailUser(document["oldMail"].GetString(), document["newMail"].GetString());
  response.send(Pistache::Http::Code::Ok, "");
  return 0;
}

int Server::disconnect(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){ 
  rapidjson::Document document;
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  if(!document.HasMember("mail")) {
      std::cout << "Il manque le champ mail" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'mail'");
      return -1;
    }
  _manager->disconnectUser(document["mail"].GetString(), "");
  response.send(Pistache::Http::Code::Ok, "");
  return 0;
}

int Server::infoUser(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){ 
  rapidjson::Document document;
  std::pair<size_t, std::string> jsonResult;
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  if(!document.HasMember("userToken")) {
      std::cout << "Il manque le champ userToken" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'userToken'");
      return -1;
    }
  if(!document.HasMember("mail")) {
      std::cout << "Il manque le champ mail" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'mail'");
      return -1;
    }
  jsonResult = _manager->getInfoUser(document["userToken"].GetString(), document["mail"].GetString());
  response.send(Pistache::Http::Code::Ok, jsonResult.second);
  return 0;
}

int Server::addCarPart(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
  rapidjson::Document	document;
  size_t		result;

  document.Parse(request.body().c_str());
  if(!document.HasMember("name")) {
      std::cout << "Il manque le champ name" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'name'");
      return -1;
    }
  if(!document.HasMember("price")) {
      std::cout << "Il manque le champ price" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field price'");
      return -1;
    }
  if(!document.HasMember("photo")) {
      std::cout << "Il manque le champ photo" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'photo'");
      return -1;
    }
  result = _manager->addCarPartInBDD(document["name"].GetString(), document["price"].GetString(), document["photo"].GetString());
  response.send(Pistache::Http::Code::Ok, "route addCarPart");
  return 0;
}

int Server::getCarPart(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){ 
  rapidjson::Document document;
  std::pair<size_t, std::string> jsonResult;
  
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  if(!document.HasMember("userToken")) {
      std::cout << "Il manque le champ userToken" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'userToken'");
      return -1;
    }
  if(!document.HasMember("partName")) {
      std::cout << "Il manque le champ partName" << std::endl;
      response.send(Pistache::Http::Code::Bad_Request, "Bad JSON. Need a field 'partName'");
      return -1;
    }
  jsonResult = _manager->getInfoUser(document["userToken"].GetString(), document["partName"].GetString());
  //std::cout << "Get car Part"  << std::endl;
  response.send(Pistache::Http::Code::Ok, jsonResult.second);
  return 0;
}
