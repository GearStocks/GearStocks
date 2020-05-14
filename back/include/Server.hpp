#ifndef SERVER_HPP_
# define SERVER_HPP_

#include <memory>
#include "BddManager.hpp"
#include "pistache/endpoint.h"
#include "pistache/router.h"
#include "pistache/http.h"

class Server
{
    public:
        Server(Pistache::Address addr, BddManager *mdr);
        ~Server();
        void    start();
        void    shutdown();
    private:
        int     Hello(const Pistache::Rest::Request& request,
		      Pistache::Http::ResponseWriter response);
        int     PostRegister(const Pistache::Rest::Request& request,
			    Pistache::Http::ResponseWriter response);
        int     PostConnect(const Pistache::Rest::Request& request,
			    Pistache::Http::ResponseWriter response);
	int     OptionsConnect(const Pistache::Rest::Request& request,
			    Pistache::Http::ResponseWriter response);
  
	int	UpdateUser(const Pistache::Rest::Request &request,
			   Pistache::Http::ResponseWriter reponse);
	int	disconnect(const Pistache::Rest::Request &request,
		     Pistache::Http::ResponseWriter reponse);
	int	infoUser(const Pistache::Rest::Request &request,
			   Pistache::Http::ResponseWriter reponse);
	int	addCarPart(const Pistache::Rest::Request &request,
			   Pistache::Http::ResponseWriter reponse);
	int	getCarPart(const Pistache::Rest::Request &request,
			   Pistache::Http::ResponseWriter reponse);
	int	forgottenPassword(const Pistache::Rest::Request &request,
			   Pistache::Http::ResponseWriter reponse);
  
        void    setupRoutes();
        std::shared_ptr<Pistache::Http::Endpoint> httpEndpoint;
        Pistache::Rest::Router router;
	BddManager	*_manager;
};

#endif
