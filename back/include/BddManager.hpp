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
  size_t	userRegister(std::vector<std::string> documentContent);
  size_t	updateNameUser(std::string mailUser, std::string oldName, std::string newName);
  size_t	updatePseudoUser(std::string mailUser, std::string oldPseudo, std::string newPseudo);
  size_t	updateMailUser(std::string oldMail, std::string newMail);
  size_t	updateDateInBDD(std::string mailUser, std::string date);
  size_t	updateTokenInBDD(std::string mailUser, std::string token);
  size_t	updatePasswordUser(std::string mailUser, std::string oldPass, std::string newPass);
  size_t	resetPassword(std::string mailUser, std::string newPassword);
  std::string	getTime();
  void		disconnectUser(std::string mailUser, std::string token);
  size_t	addCarPartInBDD(std::string name, std::string price, std::string photo);
  std::string	generateRandomString(size_t size);
  std::pair<size_t, std::string>	getInfoUser(std::string userToken, std::string userMail);
  std::pair<size_t, std::string>	getCarPart(std::string userToken, std::string partName);
private:
  void		connect();
  
  void		addContentInBDD(auto collection, bsoncxx::builder::stream::document &doc);
  void		printCollection(auto collection);
  void		deleteContentInBDD(auto collection, std::string field, std::string value);
  void		updateContentInBDD(auto collection, std::string field,
			   std::string oldValue, std::string newValue);
  std::string	checkIfExist(auto collection, std::string field, std::string value);
  std::string	cryptPass(std::string nonHashPass);
  mongocxx::instance	_inst{};
  mongocxx::client	_conn;
  mongocxx::collection	_userCollection;
  mongocxx::collection	_carPartCollection;
};

#endif
