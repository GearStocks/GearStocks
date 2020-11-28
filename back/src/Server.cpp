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
  Pistache::Rest::Routes::Post(router, "/addBookmark", Pistache::Rest::Routes::bind(&Server::addBookmark, this));
  Pistache::Rest::Routes::Options(router, "/addBookmark", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/delBookmark", Pistache::Rest::Routes::bind(&Server::delBookmark, this));
  Pistache::Rest::Routes::Options(router, "/delBookmark", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/addCarPart", Pistache::Rest::Routes::bind(&Server::addCarPart, this));
  Pistache::Rest::Routes::Post(router, "/getFullCarPart", Pistache::Rest::Routes::bind(&Server::getFullCarPart, this));
  Pistache::Rest::Routes::Options(router, "/getFullCarPart", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/forgottenPassword", Pistache::Rest::Routes::bind(&Server::forgottenPassword, this));
  Pistache::Rest::Routes::Options(router, "/forgottenPassword", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/listParts", Pistache::Rest::Routes::bind(&Server::listParts, this));
  Pistache::Rest::Routes::Options(router, "/listParts", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/listPartsByCategory", Pistache::Rest::Routes::bind(&Server::listPartsByCategory, this));
  Pistache::Rest::Routes::Options(router, "/listPartsByCategory", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/getSubCategoriesFromCategory", Pistache::Rest::Routes::bind(&Server::getSubCategoriesFromCategory, this));
  Pistache::Rest::Routes::Options(router, "/getSubcategoriesFromCategory", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/getNonEmptyCategoryNames", Pistache::Rest::Routes::bind(&Server::getNonEmptyCategoryNames, this));
  Pistache::Rest::Routes::Options(router, "/getNonEmptyCategoryNames", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
  Pistache::Rest::Routes::Post(router, "/contact", Pistache::Rest::Routes::bind(&Server::sendContact, this));
  Pistache::Rest::Routes::Options(router, "/contact", Pistache::Rest::Routes::bind(&Server::OptionsConnect, this));
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

//Route Options générique
int Server::OptionsConnect(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response) {
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  response.send(Pistache::Http::Code::Ok, "");
}

//Route permettant la connection d'un utilisateur
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
  
  if(!document.HasMember("email")) {
    std::cout << "il manque le champ email" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'email'", allocator); 
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
  i = _manager->userConnect(document["email"].GetString(), document["password"].GetString(), token);
  if (i == 0) {
    std::cout << token << std::endl;
    _manager->updateDateInBDD(document["email"].GetString(), _manager->getTime());
    _manager->updateTokenInBDD(document["email"].GetString(), token);
    rapidjson::Value s;
    s = rapidjson::StringRef(token.c_str());
    document2.AddMember("token", s, allocator);

    rapidjson::Document* doc3;
    doc3 = _manager->getInfoUser(token, document["email"].GetString());
    if (doc3 == NULL) {
      document2.AddMember("error", "Error with the mail or the token", allocator); 
      document2.Accept(writer);
      response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
      return -1;
    }
    else {
      mergeObjects(document2, *doc3, allocator);
      document2.Accept(writer);
      response.send(Pistache::Http::Code::Ok, strbuf.GetString());
    }
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

//Route permettant l'inscription d'un utilisateur sur le site
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
  if(!document.HasMember("email")) {
    std::cout << "Il manque le champ email" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'email'", allocator); 
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
  documentContent.push_back(document["email"].GetString());
  documentContent.push_back(document["firstName"].GetString());
  documentContent.push_back(document["lastName"].GetString());
  documentContent.push_back(document["birthDay"].GetString());
  i = _manager->userRegister(documentContent);
  
  if (i == 0) {
    document2.AddMember("success", "Register succeeded", allocator); 
    document2.Accept(writer);
    _emailer->sendMailDependingOnType(document["email"].GetString(), "", "registerConfirmation", "", "", "");
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

//Route permettant la mise à jour des informations utilisateurs
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
  if(!document.HasMember("email")) {
    std::cout << "Il manque le champ email" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'email'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
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
  if(!document.HasMember("firstName")) {
    std::cout << "Il manque le champ firstName" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'firstName'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document.HasMember("userToken")) {
    std::cout << "Il manque le champ userToken" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'userToken'", allocator); 
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
  errorHandling = _manager->checkIfUserIsAuth(document["userToken"].GetString(), "", document["username"].GetString(), document["email"].GetString());
  if (errorHandling == 1) {
    document2.AddMember("error", "The password doesn't match", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (errorHandling == 2) {
    document2.AddMember("error", "The tokenUser doesn't match", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (errorHandling == 3) {
    document2.AddMember("error", "Username already exist", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (errorHandling == 4) {
    document2.AddMember("error", "Mail already match", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  errorHandling = _manager->updateNameUser(document["userToken"].GetString(), document["username"].GetString(), document["firstName"].GetString(), document["lastName"].GetString());
  errorHandling = _manager->updateMailUser(document["userToken"].GetString(), document["email"].GetString());
  errorHandling = _manager->updatePasswordUser(document["userToken"].GetString(), document["password"].GetString());
  document2.AddMember("success", "Update done", allocator); 
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

//Route permettant à un utilisateur de se déconnecter du site
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
  if(!document.HasMember("email")) {
    std::cout << "Il manque le champ email" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'email'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  errorHandling = _manager->disconnectUser(document["email"].GetString(), "");
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

//Route retournant les informations utilisateur
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
  if(!document.HasMember("email")) {
    std::cout << "Il manque le champ email" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'email'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  rapidjson::Document* doc3;
  doc3 = _manager->getInfoUser(document["userToken"].GetString(), document["email"].GetString());
  if (doc3 == NULL) {
    document2.AddMember("error", "Error with the email or the token", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  else {
    document2.AddMember("success", "Info user succeeded", allocator);
    mergeObjects(document2, *doc3, allocator);
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  }
  
  return 0;
}

//Route pour supprimer un favoris
int Server::delBookmark(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
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
  else if(!document.HasMember("partName")) {
    std::cout << "Il manque le champ partName" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'partName'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  else {
    if (_manager->delBookmark(document["userToken"].GetString(), document["partName"].GetString()) == 1) {
      std::cout << "User Token introuvable" << std::endl;
      document2.AddMember("error", "Invalid User Token", allocator); 
      document2.Accept(writer);
      response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
      return -1;
    }
  std::cout << "Bookmark deleted" << std::endl;
  document2.AddMember("success", "Bookmark deleted", allocator); 
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  }
  return 0;
}

//Route pour ajout de favoris par l'utilisateur
int Server::addBookmark(const Pistache::Rest::Request& request, Pistache::Http::ResponseWriter response){
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
  else if(!document.HasMember("partName")) {
    std::cout << "Il manque le champ partName" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'partName'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  else {
    if (_manager->addBookmark(document["userToken"].GetString(), document["partName"].GetString()) == 1) {
      std::cout << "User Token introuvable" << std::endl;
      document2.AddMember("error", "Invalid User Token", allocator); 
      document2.Accept(writer);
      response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
      return -1;
    }
    else
    {
      std::cout << "Bookmark successfuly added" << std::endl;
      document2.AddMember("success", "Bookmark successfully added", allocator); 
      document2.Accept(writer);
      //response.send(Pistache::Http::Code::Ok, strbuf.GetString());
      response.send(Pistache::Http::Code::Ok, "");
    }
    return 0;
  }
  return 0;
}

//Route pour ajouter d'une pièce automobile dans la BDD utiliser par le Scrapper
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
    std::cout << "Il manque le champ prices" << std::endl;
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
  if(!document.HasMember("month")) {
    std::cout << "Il manque le champ month" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'month'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }  
  if(!document.HasMember("categories")) {
    std::cout << "Il manque le champ categories" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'categories'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }

//std::vector<std::string> prices;
/*
  const rapidjson::Value& attributes = document["prices"];
  for (rapidjson::Value::ConstValueIterator itr = attributes.Begin(); itr != attributes.End(); ++itr) {
    const rapidjson::Value& attribute = *itr;
    for (rapidjson::Value::ConstMemberIterator itr2 = attribute.MemberBegin(); itr2 != attribute.MemberEnd(); ++itr2) {
      prices.push_back(itr2->value.GetString());
    }
  }
  */
  
  std::vector<std::string> categories;
  const rapidjson::Value& attributesCategories = document["categories"];
  for (rapidjson::Value::ConstValueIterator itCategories = attributesCategories.Begin(); itCategories != attributesCategories.End() ; ++itCategories) {
    const rapidjson::Value& attributeCategories = *itCategories;
    categories.push_back((attributeCategories.MemberBegin())->value.GetString());
  }
  result = _manager->addCarPartInBDD(document["name"].GetString(), document["month"].GetString(), document["prices"].GetString(), document["photo"].GetString(), document["description"].GetString(), categories);
  document2.AddMember("success", "Car part added", allocator);
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  //response.send(Pistache::Http::Code::Ok, "Test");
  return 0;
}

//Route renvoie les informations d'une piéce à partire de son nom
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

//Route pour la procédure de récupération de mot de passe (mot de passe oublié, envoie d'un email)
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
  if(!document.HasMember("email")) {
    std::cout << "Il manque le champ email" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'email'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  std::string randomPassword = _manager->generateRandomString(12);
  if(_manager->resetPassword(document["email"].GetString(), randomPassword) == 1) {
    document2.AddMember("error", "This email is not used by any user", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  _emailer->sendMailDependingOnType(document["email"].GetString(), randomPassword, "passwordReset", "", "", "");
  document2.AddMember("success", "Password reset and mail sent", allocator); 
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

//Route renvoie une liste de pièce détaché à partire d'un mot clés
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
  if(!document.HasMember("filters")) {
    std::cout << "Il manque le champ filters" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'filters'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document["filters"].HasMember("maxPrice")) {
    std::cout << "Il manque le champ maxPrice" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'maxPrice'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document["filters"].HasMember("minPrice")) {
    std::cout << "Il manque le champ minPrice" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'minPrice'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document["filters"].HasMember("category")) {
    std::cout << "Il manque le champ category" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'category'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if(!document["filters"].HasMember("model")) {
    std::cout << "Il manque le champ model" << std::endl;
    document2.AddMember("error", "Bad JSON. Need a field 'model'", allocator); 
    document2.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  
  document2.AddMember("success", "list parts", allocator);


  //METTRE DES HASMEMBER
  std::vector<std::string> filters;
  const rapidjson::Value& attributes = document["filters"];
  filters.push_back(document["filters"]["maxPrice"].GetString());
  filters.push_back(document["filters"]["minPrice"].GetString());
  filters.push_back(document["filters"]["category"].GetString());
  filters.push_back(document["filters"]["model"].GetString());
  //std::cout << document["filters"]["maxPrice"].GetString() << std::endl;
  
  
  std::vector<std::pair<std::string, size_t>>	resultParsing;
  resultParsing = _manager->parseKeyWordInTree(_manager->generateTree(), document["keyWord"].GetString());
  if (resultParsing.empty()) {
    std::cout << "Aucunes pièces ne correspondent" << std::endl;
    document2.AddMember("data", "Part not found", allocator);
  }
  else {
    std::vector<std::pair<std::string, size_t>>::iterator it = resultParsing.begin();
    rapidjson::Document* doc3;
    int i = 1;
    while (it < resultParsing.end() && i <= 10) {
      doc3 = _manager->getCarPart((*it).first, filters);
      if (doc3 != NULL)
	mergeObjects(document2, *doc3, allocator);
      ++it;
      ++i;
    }
    }
  document2.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

int Server::listPartsByCategory(const Pistache::Rest::Request &request, Pistache::Http::ResponseWriter response)
{
  rapidjson::Document documentRequest;
  rapidjson::Document documentResponse;
  documentResponse.SetObject();
  rapidjson::Document::AllocatorType& allocator = documentResponse.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);

  documentRequest.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  if (!documentRequest.HasMember("userToken")) {
    std::cout << "Il manque le champ userToken" << std::endl;
    documentResponse.AddMember("error", "Bad JSON. Need a field 'userToken'", allocator);
    documentResponse.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (!documentRequest.HasMember("category")) {
    std::cout << "Il manque le champ category" << std::endl;
    documentResponse.AddMember("error", "Bad JSON. Need a field 'category'", allocator);
    documentResponse.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (!documentRequest.HasMember("pageNb")) {
    std::cout << "Il manque le champ pageNb" << std::endl;
    documentResponse.AddMember("error", "Bad JSON. Need a field 'pageNb'", allocator);
    documentResponse.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  documentResponse.AddMember("success", "list parts", allocator);

  std::vector<std::pair<std::string, size_t>> resultParsing;
  resultParsing = _manager->parseKeyWordInTreeByCategory(_manager->generateTree(), documentRequest["category"].GetString());
  if (resultParsing.empty()) {
    std::cout << "Aucune pièces dans cette categorie." << std::endl;
    documentResponse.AddMember("data", "Part not found", allocator);
  }
  else {
    std::vector<std::pair<std::string, size_t>>::iterator it = resultParsing.begin();
    rapidjson::Document *documentIt;
    int i = 1;
    while (it < resultParsing.end() && i <= 10) {
      documentIt = _manager->getCarPart((*it).first, std::vector<std::string>());
      mergeObjects(documentResponse, *documentIt, allocator);
      ++it;
      ++i;
    }
  }
  documentResponse.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

int Server::getSubCategoriesFromCategory(const Pistache::Rest::Request &request, Pistache::Http::ResponseWriter response)
{
  rapidjson::Document documentRequest;
  rapidjson::Document documentResponse;
  documentResponse.SetObject();
  rapidjson::Document::AllocatorType& allocator = documentResponse.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);

  documentRequest.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));

  if (!documentRequest.HasMember("category")) {
    std::cout << "Il manque le champ category" << std::endl;
    documentResponse.AddMember("error", "Bad JSON. Need a field 'category'", allocator);
    documentResponse.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  documentResponse.AddMember("success", "list parts", allocator);
  
  std::vector<std::string>  resultCategories;

  documentResponse.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

int Server::getNonEmptyCategoryNames(const Pistache::Rest::Request &request, Pistache::Http::ResponseWriter response)
{
  rapidjson::Document documentRequest;
  rapidjson::Document documentResponse;
  documentResponse.SetObject();
  rapidjson::Document::AllocatorType &allocatorResponse = documentResponse.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);

  documentRequest.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));

  documentResponse.AddMember("success", "list parts", allocatorResponse);

  std::vector<std::string>  resultListCategories;
  resultListCategories = _manager->parseCategoryNames();
  if (resultListCategories.empty()) {
    std::cout << "Aucune categorie n'est définie." << std::endl;
    documentResponse.AddMember("data", "Part not found", allocatorResponse);
  } else {
    std::string arrayName = "categories";
    rapidjson::Value arrayNameJson;
    rapidjson::Value tmpArray(rapidjson::kArrayType);
    for (int i = 0 ; i < resultListCategories.size() ; ++i) {
      rapidjson::Value tmpObject;
      tmpObject.SetObject();
      std::string tmpCatName = resultListCategories.at(i);
      rapidjson::Value tmpJsonCatName;
      tmpJsonCatName.SetString(tmpCatName.c_str(), allocatorResponse);
      tmpObject.AddMember("name", tmpJsonCatName, allocatorResponse);
      tmpArray.PushBack(tmpObject, allocatorResponse);
    }
    arrayNameJson.SetString(arrayName.c_str(), allocatorResponse);
    documentResponse.AddMember(arrayNameJson, tmpArray, allocatorResponse);
  }
  documentResponse.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

int Server::sendContact(const Pistache::Rest::Request &request, Pistache::Http::ResponseWriter response)
{
  rapidjson::Document documentRequest;
  rapidjson::Document documentResponse;
  documentResponse.SetObject();
  rapidjson::Document::AllocatorType& allocator = documentResponse.GetAllocator();
  rapidjson::StringBuffer strbuf;
  rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);

  documentRequest.Parse(request.body().c_str());
  response.headers().add<Pistache::Http::Header::AccessControlAllowOrigin>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowMethods>("*");
  response.headers().add<Pistache::Http::Header::AccessControlAllowHeaders>("*");
  response.headers().add<Pistache::Http::Header::ContentType>(MIME(Application, Json));
  if (!documentRequest.HasMember("object")) {
    std::cout << "Il manque le champ userToken" << std::endl;
    documentResponse.AddMember("error", "Bad JSON. Need a field 'object'", allocator);
    documentResponse.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (!documentRequest.HasMember("content")) {
    std::cout << "Il manque le champ userToken" << std::endl;
    documentResponse.AddMember("error", "Bad JSON. Need a field 'content'", allocator);
    documentResponse.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (!documentRequest.HasMember("name")) {
    std::cout << "Il manque le champ userToken" << std::endl;
    documentResponse.AddMember("error", "Bad JSON. Need a field 'name'", allocator);
    documentResponse.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  if (!documentRequest.HasMember("mail")) {
    std::cout << "Il manque le champ userToken" << std::endl;
    documentResponse.AddMember("error", "Bad JSON. Need a field 'mail'", allocator);
    documentResponse.Accept(writer);
    response.send(Pistache::Http::Code::Bad_Request, strbuf.GetString());
    return -1;
  }
  _emailer->sendMailDependingOnType(documentRequest["mail"].GetString(), "", "contact", 
            documentRequest["object"].GetString(), documentRequest["content"].GetString(), documentRequest["name"].GetString());

  documentResponse.AddMember("success", "Contact mail sent", allocator); 
  documentResponse.Accept(writer);
  response.send(Pistache::Http::Code::Ok, strbuf.GetString());
  return 0;
}

// ??
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
