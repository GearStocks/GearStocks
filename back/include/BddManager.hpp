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


class BddManager
{
public:
	BddManager();
	~BddManager();
	size_t	userConnect(std::string username, std::string password);	
	size_t	userRegister(std::string username, std::string password, std::string mail);
private:
	void	connect();
	void	disconnect();
	void	addContentInBDD(auto collection, bsoncxx::builder::stream::document &doc);
	void	printCollection(auto collection);
	void	deleteContentInBDD(auto collection, std::string field, std::string value);
	void	updateContentInBDD(auto collection, std::string field,
				   std::string oldValue, std::string newValue);
	std::string	checkIfExist(auto collection, std::string field, std::string value);
	mongocxx::instance _inst{};
        mongocxx::client _conn{mongocxx::uri{}};
	mongocxx::collection _collection;
};

#endif
