#ifndef SERVER_HPP_
# define SERVER_HPP_

#include <memory>
#include "BddManager.hpp"
#include "Emailer.hpp"
#include "pistache/endpoint.h"
#include "pistache/router.h"
#include "pistache/http.h"

class Server
{
public:
  Server(Pistache::Address addr, BddManager *manager, Emailer *emailer);
  ~Server();
  void	start();
  void	shutdown();
private:
  int	Hello(const Pistache::Rest::Request& request,
	  Pistache::Http::ResponseWriter response);
  int	PostRegister(const Pistache::Rest::Request& request,
	  Pistache::Http::ResponseWriter response);
  int	PostConnect(const Pistache::Rest::Request& request,
        Pistache::Http::ResponseWriter response);
  int	OptionsConnect(const Pistache::Rest::Request& request,
	  Pistache::Http::ResponseWriter response);
  int	UpdateUser(const Pistache::Rest::Request &request,
        Pistache::Http::ResponseWriter reponse);
  int	disconnect(const Pistache::Rest::Request &request,
        Pistache::Http::ResponseWriter reponse);
  int	infoUser(const Pistache::Rest::Request &request,
        Pistache::Http::ResponseWriter reponse);
  int	addCarPart(const Pistache::Rest::Request &request,
        Pistache::Http::ResponseWriter reponse);
  int	getFullCarPart(const Pistache::Rest::Request &request,
        Pistache::Http::ResponseWriter reponse);
  int	forgottenPassword(const Pistache::Rest::Request &request,
	  Pistache::Http::ResponseWriter reponse);
  int	listParts(const Pistache::Rest::Request &request,
	  Pistache::Http::ResponseWriter reponse);
  int addBookmark(const Pistache::Rest::Request& request,
        Pistache::Http::ResponseWriter response);
  int delBookmark(const Pistache::Rest::Request& request,
        Pistache::Http::ResponseWriter response);
  int listPartsByCategory(const Pistache::Rest::Request &request,
        Pistache::Http::ResponseWriter response);
  int getSubCategoriesFromCategory(const Pistache::Rest::Request &request,
        Pistache::Http::ResponseWriter response);
  int getNonEmptyCategoryNames(const Pistache::Rest::Request &request, 
        Pistache::Http::ResponseWriter response);
  int getInitFilterValues(const Pistache::Rest::Request &request,
        Pistache::Http::ResponseWriter response);
  int sendContact(const Pistache::Rest::Request &request, 
        Pistache::Http::ResponseWriter response);
  void	mergeObjects(rapidjson::Value &dstObject, rapidjson::Value &srcObjects, rapidjson::Document::AllocatorType &allocator);
  
  void	setupRoutes();
  
  std::shared_ptr<Pistache::Http::Endpoint>	httpEndpoint;
  Pistache::Rest::Router			router;
  BddManager					*_manager;
  Emailer					*_emailer;
};

#endif
