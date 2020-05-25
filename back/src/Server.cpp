#include <iostream>
#include "pistache/endpoint.h"
#include "pistache/router.h"
#include "pistache/http.h"
#include <memory>
#include <cstdlib>
#include "../include/Server.hpp"
#include "../include/BddManager.hpp"
#include "../include/TokenManager.hpp"
#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

Server::Server(Pistache::Address addr, BddManager *manager, Emailer *emailer){
  httpEndpoint = std::make_shared<Pistache::Http::Endpoint>(addr);
  _manager = manager;
  _emailer = emailer;
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
Pistache::Rest::Routes::Post(router, "/getFullCarPart", Pistache::Rest::Routes::bind(&Server::getFullCarPart, this));
  Pistache::Rest::Routes::Options(router, "/getFullCarPart", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/forgottenPassword", Pistache::Rest::Routes::bind(&Server::forgottenPassword, this));
  Pistache::Rest::Routes::Options(router, "/forgottenPassword", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/listParts", Pistache::Rest::Routes::bind(&Server::listParts, this));
  Pistache::Rest::Routes::Options(router, "/listParts", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  
}

int Server::Hello(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  
  std::cout << "Hello World" << std::endl;
  document2.AddMember("success", "Hello World. The API is online. Port:8000", allocator); 
  document2.Accept(writer);  
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  
}

int Server::OptionsConnect(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response) {
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  response.send(Pistache::Http::Code::Ok, "");
}

int Server::PostConnect(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response) {
  rapidjson::Document document;
  TokenManager	tokenManager;
  std::string token = tokenManager.generateToken();
  size_t	i = 3;
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  
  document.Parse(request.body().c_str());
  
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  
  if(!document.HasMember("mail")) {
    std::cout << "il manque le champ mail" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'mail'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("password")) {
    std::cout << "Il manque le champ password" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'password'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("rememberMe")) {
    std::cout << "Il manque le champ rememberMe" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'rememberMe'", allocator); 
    document2.Accept(writer);
    
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }  
  i = _manager->userConnect(document["mail"].GetString(), document["password"].GetString(), token);
  if (i == 0) {
    std::cout << token << std::endl;
    _manager->updateDateInBDD(document["mail"].GetString(), _manager->getTime());
    _manager->updateTokenInBDD(document["mail"].GetString(), token);
    rapidjson::Value s;
    s = rapidjson::StringRef(token.c_str());
    document2.AddMember("token", s, allocator);

    rapidjson::Document* doc3;
    doc3 = _manager->getInfoUser(token, document["mail"].GetString());
    mergeObjects(document2, *doc3, allocator);
    
    document2.Accept(writer);
    
    response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  }
  else if (i == 1) {
    document2.AddMember("error", "Bad Password", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
  }
  else if (i == 2) {
    document2.AddMember("error", "User doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
  }
  else {
    document2.AddMember("error", "Error occured", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Internal_Server_Error, strbuf.GetString());
  }
}

int Server::PostRegister(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
  std::vector<std::string> documentContent;
  rapidjson::Document document;
  size_t	i = 3;
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  document.Parse(request.body().c_str());
  if(!document.HasMember("username")) {
    std::cout << "Il manque le champ username" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'username'", allocator); 
    document2.Accept(writer);    
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("password")) {
    std::cout << "Il manque le champ password" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'password'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("mail")) {
    std::cout << "Il manque le champ mail" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'mail'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("firstName")) {
    std::cout << "Il manque le champ firstName" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'firstName'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("lastName")) {
    std::cout << "Il manque le champ lastName" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'lastName'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("birthDay")) {
    std::cout << "Il manque le champ birthDay" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'birthDay'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  
  documentContent.push_back(document["username"].GetString());
  documentContent.push_back(document["password"].GetString());
  documentContent.push_back(document["mail"].GetString());
  documentContent.push_back(document["firstName"].GetString());
  documentContent.push_back(document["lastName"].GetString());
  documentContent.push_back(document["birthDay"].GetString());
  i = _manager->userRegister(documentContent);
  
  if (i == 0) {
    document2.AddMember("success", "Register succeeded", allocator); 
    document2.Accept(writer);
    _emailer->sendMailDependingOnType(document["mail"].GetString(), "", "registerConfirmation");
    response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  }
  else if (i == 1) {
    document2.AddMember("error", "User already exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
  }
  else if (i == 2) {
    document2.AddMember("error", "Mail already used", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
  }
  else {
    document2.AddMember("error", "Error occured", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Internal_Server_Error, strbuf.GetString());
  }
  return 0;
}

int Server::UpdateUser(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
  rapidjson::Document document;
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  size_t errorHandling = 0;

  //ATTENTION: LA GESTION DERREUR NEST PAS SUPER, LE USER PEUT CHANGER ALORS QUE LE MDP EST ERRONE
  //IL FAUT FAIRE UNE FONCTION QUI CHECK AVANT DE COMMENCER A CHANGER
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  if(!document.HasMember("mail")) {
    std::cout << "Il manque le champ mail" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'mail'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("oldUsername")) {
    std::cout << "Il manque le champ oldUsername" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'oldUsername'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("newUsername")) {
    std::cout << "Il manque le champ newUsername" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'newUsername'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("oldPass")) {
    std::cout << "Il manque le champ oldPass" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'oldPass'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("newPass")) {
    std::cout << "Il manque le champ newPass" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'newPass'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("newMail")) {
    std::cout << "Il manque le champ newMail" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'newMail'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  errorHandling = _manager->checkIfOldExist(document["oldPass"].GetString(), document["mail"].GetString(), document["oldUsername"].GetString());
  if (errorHandling == 1) {
    document2.AddMember("error", "Old password doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (errorHandling == 2) {
    document2.AddMember("error", "Old mail doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (errorHandling == 3) {
    document2.AddMember("error", "Old username doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  
  errorHandling = _manager->updateNameUser(document["mail"].GetString(), document["oldUsername"].GetString(), document["newUsername"].GetString());
  if (errorHandling == 1) {
    document2.AddMember("error", "Mail doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (errorHandling == 2) {
    document2.AddMember("error", "Old username doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  
    errorHandling = _manager->updatePasswordUser(document["mail"].GetString(), document["oldPass"].GetString(), document["newPass"].GetString());
  if (errorHandling == 1) {
    document2.AddMember("error", "Mail doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (errorHandling == 2) {
    document2.AddMember("error", "Old password doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  errorHandling = _manager->updateMailUser(document["mail"].GetString(), document["newMail"].GetString());
  if (errorHandling == 1) {
    document2.AddMember("error", "Mail doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (errorHandling == 2) {
    document2.AddMember("error", "New mail already exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  document2.AddMember("success", "Update done", allocator); 
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

int Server::disconnect(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){ 
  rapidjson::Document document;
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  size_t	errorHandling = 0;
  
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  if(!document.HasMember("mail")) {
    std::cout << "Il manque le champ mail" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'mail'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  errorHandling = _manager->disconnectUser(document["mail"].GetString(), "");
  if (errorHandling == 1) {
    document2.AddMember("error", "Mail doesn't exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  document2.AddMember("success", "User disconnected", allocator); 
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

int Server::infoUser(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){ 
  rapidjson::Document document;
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  if(!document.HasMember("userToken")) {
    std::cout << "Il manque le champ userToken" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'userToken'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("mail")) {
    std::cout << "Il manque le champ mail" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'mail'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  rapidjson::Document* doc3;
  doc3 = _manager->getInfoUser(document["userToken"].GetString(), document["mail"].GetString());
  document2.AddMember("success", "Info user succeeded", allocator);
  mergeObjects(document2, *doc3, allocator);
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  
  return 0;
}

int Server::addCarPart(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
  rapidjson::Document	document;
  size_t		result;
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);

  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  document.Parse(request.body().c_str());
  if(!document.HasMember("name")) {
    std::cout << "Il manque le champ name" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'name'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("prices")) {
    std::cout << "Il manque le champ price" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'price'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("photo")) {
    std::cout << "Il manque le champ photo" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'photo'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("description")) {
    std::cout << "Il manque le champ decription" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'description'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }

  std::vector<std::string> prices;

  const rapidjson::Value& attributes = document["prices"];
  for (rapidjson::Value::ConstValueIterator itr = attributes.Begin(); itr != attributes.End(); ++itr) {
    const rapidjson::Value& attribute = *itr;
    for (rapidjson::Value::ConstMemberIterator itr2 = attribute.MemberBegin(); itr2 != attribute.MemberEnd(); ++itr2) {
      prices.push_back(itr2->value.GetString());
    }
  }
  
  result = _manager->addCarPartInBDD(document["name"].GetString(), prices, document["photo"].GetString(), document["description"].GetString());
  document2.AddMember("success", "Car part added", allocator); 
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

int Server::getFullCarPart(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){ 
  rapidjson::Document document;
  
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));

  if(!document.HasMember("partName")) {
    std::cout << "Il manque le champ partName" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'partName'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  rapidjson::Document* doc3;
  doc3 = _manager->getFullCarPart(document["partName"].GetString());
  document2.AddMember("success", "Get car part succeeded", allocator);
  mergeObjects(document2, *doc3, allocator);
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString()); 
  return 0;
}

int Server::forgottenPassword(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){ 
  rapidjson::Document document;
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  if(!document.HasMember("mail")) {
    std::cout << "Il manque le champ mail" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'mail'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  std::string randomPassword = _manager->generateRandomString(12);
  if(_manager->resetPassword(document["mail"].GetString(), randomPassword) == 1) {
    document2.AddMember("error", "This email is not used by any user", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  _emailer->sendMailDependingOnType(document["mail"].GetString(), randomPassword, "passwordReset");
  document2.AddMember("success", "Password reset and mail sent", allocator); 
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

int Server::listParts(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
  rapidjson::Document document;
  rapidjson::Document document2;
  document2.SetObject();
  rapidjson::Document::AllocatorType& allocator = document2.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
  
  document.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  if(!document.HasMember("keyWord")) {
    std::cout << "Il manque le champ keyWord" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'keyWord'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  document2.AddMember("success", "list parts", allocator); 
  
  std::vector<std::string>	resultParsing;
  resultParsing = _manager->parseKeyWordInTree(_manager->generateTree(), document["keyWord"].GetString());
  if (resultParsing.empty()) {
    std::cout << "Aucunes pièces ne correspondent" << std::endl;
    document2.AddMember("data", "Part not found", allocator); 
  }
  else {
    std::vector<std::string>::iterator it = resultParsing.begin();
    rapidjson::Document* doc3;
    int i = 1;
    while (it < resultParsing.end() && i <= 10) {
      //std::cout << "result parsing:" << (*it) << std::endl;
      doc3 = _manager->getCarPart(*it);
      mergeObjects(document2, *doc3, allocator);
      ++it;
      ++i;
    }
  }
  
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

void Server::mergeObjects(rapidjson::Value &dstObject, rapidjson::Value &srcObject, rapidjson::Document::AllocatorType &allocator)
{
    for (auto srcIt = srcObject.MemberBegin(); srcIt != srcObject.MemberEnd(); ++srcIt)
    {
        auto dstIt = dstObject.FindMember(srcIt->name);
        if (dstIt != dstObject.MemberEnd())
        {
            assert(srcIt->value.GetType() == dstIt->value.GetType());
            if (srcIt->value.IsArray())
            {
                for (auto arrayIt = srcIt->value.Begin(); arrayIt != srcIt->value.End(); ++arrayIt)
                {
                    dstIt->value.PushBack(*arrayIt, allocator);
                }
            }
            else if (srcIt->value.IsObject())
            {
                mergeObjects(dstIt->value, srcIt->value, allocator);
            }
            else
            {
                dstIt->value = srcIt->value;
            }
        }
        else
        {
            dstObject.AddMember(srcIt->name, srcIt->value, allocator);
        }
    }
}
