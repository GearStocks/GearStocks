//
// EPITECH PROJECT, 2019
// main
// File description:
// main
//

#include <iostream>
#include "../include/BddManager.hpp"

#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>

#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>

BddManager::BddManager()
{
	connect();
}

BddManager::~BddManager()
{
	disconnect();
}

void	BddManager::connect()
{
	std::cout << "Connect" << std::endl;
	_collection = _conn["testdb"]["testcollection"];
	
	//bsoncxx::builder::stream::document document{};
	//auto collection = _conn["testdb"]["testcollection"];
	//mongocxx::collection collection = _conn["testdb"]["testcollection"];
	
	//document << "ceci est un" << "petit test";
	
	//std::cout << "BDD avant deletion" << std::endl;
	//printCollection(_collection);
	//addContentInBDD(_collection, document);
	//deleteContentInBDD(_collection, "Ceci est un test", "pour le rdv EIP2");
	//updateContentInBDD(_collection, "test1", "test2", "mdr");
	//checkIfExist(_collection, "test1", "mdr");
	//std::cout << "BDD après deletion" << std::endl;
	//printCollection(_collection);
}

size_t	BddManager::userConnect(std::string username, std::string password)
{
	std::string	valueInBDD;

	valueInBDD = checkIfExist(_collection, "username", username);
	if (valueInBDD != "")
	{
		valueInBDD = valueInBDD.substr(valueInBDD.find("password") + 13);
		valueInBDD = valueInBDD.substr(0, valueInBDD.rfind('"'));
		if (valueInBDD.compare(password) == 0)
		{
			std::cout << "gj mdr" << std::endl;
			return 0;
		}
		std::cout << "bad password" << std::endl;
		return 1;
	}
	std::cout << "user dont exist" << std::endl;
	return 2;
}

size_t	BddManager::userRegister(std::string username, std::string password, std::string mail)
{
	std::string	valueInBDD;

	valueInBDD = checkIfExist(_collection, "username", username);
	if (valueInBDD != "")
	{
		std::cout << "User already exist" << std::endl;
		return 1;
	}
	valueInBDD = checkIfExist(_collection, "email", mail);
	if (valueInBDD != "")
	{
		std::cout << "Mail already used" << std::endl;
		return 2;
	}
	bsoncxx::builder::stream::document document{};
	document << "username" << username << "email" << mail << "password" << password;
	addContentInBDD(_collection, document);
}

void	BddManager::disconnect()
{
	std::cout << "Disconnect" << std::endl;
}

void	BddManager::addContentInBDD(auto collection, bsoncxx::builder::stream::document &doc)
{
	collection.insert_one(doc.view());
}

void	BddManager::printCollection(auto collection)
{
	auto cursor = collection.find({});
	for (auto&& doc : cursor) {
		std::cout << bsoncxx::to_json(doc) << std::endl;
        }
}

void	BddManager::deleteContentInBDD(auto collection, std::string field, std::string value)
{
	bsoncxx::builder::stream::document document{};
	
	collection.delete_one(document << field << value << bsoncxx::builder::stream::finalize);
}

void	BddManager::updateContentInBDD(auto collection, std::string field, std::string oldValue, std::string newValue)
{
	bsoncxx::builder::stream::document document{};
	
	collection.update_one(document << field << oldValue <<
			      bsoncxx::builder::stream::finalize,
			      document << "$set" <<
			      bsoncxx::builder::stream::open_document <<
			      field << newValue << bsoncxx::builder::stream::close_document
			      << bsoncxx::builder::stream::finalize);
}

std::string	BddManager::checkIfExist(auto collection, std::string field, std::string value)
{
	bsoncxx::builder::stream::document document{};
	
	bsoncxx::stdx::optional<bsoncxx::document::value> maybe_result =
		collection.find_one(document << field << value
				    << bsoncxx::builder::stream::finalize);
	if(maybe_result) {
		std::string result;

		//result = bsoncxx::to_json(*maybe_result) + "\n";
		//std::cout << bsoncxx::to_json(*maybe_result) << "\n";
		//std::cout << "IL EXISTE" << std::endl;
		//return result;
		return (bsoncxx::to_json(*maybe_result));
	}
	return "";
}
