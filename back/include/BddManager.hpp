//
// EPITECH PROJECT, 2019
// test
// File description:
// test
//

#ifndef BDD_HPP_
# define BDD_HPP_

#include <string>

#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>

#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>

#include <chrono>
#include <ctime>

class BddManager
{
public:
	BddManager();
	~BddManager();
  size_t	userConnect(std::string username, std::string password, std::string token);	
	size_t	userRegister(std::string username, std::string password, std::string mail);
	size_t	updateNameUser(std::string mailUser, std::string oldName, std::string newName);
	size_t	updatePseudoUser(std::string mailUser, std::string oldPseudo, std::string newPseudo);
	size_t	updateMailUser(std::string oldMail, std::string newMail);
	size_t	updatePasswordUser(std::string mailUser, std::string oldPass, std::string newPass);
private:
	void	connect();
	void	disconnect();
	void	addContentInBDD(auto collection, bsoncxx::builder::stream::document &doc);
	void	printCollection(auto collection);
	void	deleteContentInBDD(auto collection, std::string field, std::string value);
	void	updateContentInBDD(auto collection, std::string field,
				   std::string oldValue, std::string newValue);
	std::string	checkIfExist(auto collection, std::string field, std::string value);
	std::string	getTime();
	std::string cryptPass(std::string nonHashPass);
	mongocxx::instance _inst{};
        mongocxx::client _conn{mongocxx::uri{}};
	mongocxx::collection _collection;
};

#endif
