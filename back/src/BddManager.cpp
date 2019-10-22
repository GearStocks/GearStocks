//
// EPITECH PROJECT, 2019
// main
// File description:
// main
//

#include <iostream>
#include <sstream>
#include "../include/BddManager.hpp"

#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>

#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>

#include "cryptopp/modes.h"
#include "cryptopp/aes.h"
#include "cryptopp/filters.h"

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

size_t	BddManager::userConnect(std::string username, std::string password, std::string token)
{
	std::string	valueInBDD;
  

	//std::cout << "il est:" << getTime() << std::endl;
	valueInBDD = checkIfExist(_collection, "email", username);
	if (valueInBDD != "")
	 {
		valueInBDD = valueInBDD.substr(valueInBDD.find("password") + 13);
		valueInBDD = valueInBDD.substr(0, valueInBDD.rfind("\", \"token\" : \""));
		if (valueInBDD.compare(cryptPass(password)) == 0)
		{
			//mettre le token a jour + le temps
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
	document << "username" << username << "email" << mail << "password" << cryptPass(password) << "token" << "" << "time" << "";
	addContentInBDD(_collection, document);
	return 0;
}

/*size_t	BddManager::updatePasswordUser(std::string mailUser, std::string oldPass, std::string newPass)
{
	std::string	valueInBDD;
	valueInBDD = checkIfExist(_collection, "password", oldPass);
	if (valueInBDD == "") {
		std::cout << "Old pass doesn't exist" << std::endl;
		return 0;
	}
	//checkMail before
	//valueInBDD = checkIfExist(_collection, "password",  newPass);
	updateContentInBDD(_collection, "password", oldPass, newPass);
	
}

/*size_t	BddManager::updateNameUser(std::string mailUser, std::string oldName, std::string newName)
{
	std::string	valueInBDD;
	valueInBDD = checkIfExist(_collection, "name", oldName);
	if (valueInBDD == "") {
		std::cout << "Old name doesn't exist" << std::endl;
		return 0;
	}
	//checkMail before
	//valueInBDD = checkIfExist(_collection, "password",  newPass);
	updateContentInBDD(_collection, "name", oldName, newName);
	return 0;
	}*/

size_t	BddManager::updatePseudoUser(std::string mailUser, std::string oldPseudo, std::string newPseudo)
{
	std::string	valueInBDD;
	valueInBDD = checkIfExist(_collection, "pseudo", oldPseudo);
	if (valueInBDD == "") {
		std::cout << "Old pseudo doesn't exist" << std::endl;
		return 0;
	}
	//checkMail before
	//valueInBDD = checkIfExist(_colelction, "pseudo", oldPseudo, newPseudo);
	updateContentInBDD(_collection, "pseudo", oldPseudo, newPseudo);
	return 0;
}

/*size_t	BddManager::updateToken(std::string mailUser, std::string pseudo,)
{
  std::string	valueInBDD;
  valueInBDD = checkIfExist(_collection, "pseudo", oldPseudo);
  if (valueInBDD == "") {
    std::cout << "User doesn't exist" << std::endl;
    return 0;
  }
  //checkMail before
  //valueInBDD = checkIfExist(_colelction, "pseudo", oldPseudo, newPseudo);
  updateContentInBDD(_collection, "token", oldPseudo, newPseudo);
  return 0;
}*/

size_t  BddManager::updatePasswordUser(std::string mailUser, std::string oldPass, std::string newPass)
{
  std::string     valueInBDD;
  valueInBDD = checkIfExist(_collection, "password", oldPass);
  if (valueInBDD == "") {
    std::cout << "Old pass doesn't exist" << std::endl;
    return 0;
  }
  //checkMail before
  //valueInBDD = checkIfExist(_collection, "password",  newPass);
  updateContentInBDD(_collection, "password", mailUser, newPass); 
}

size_t  BddManager::updateNameUser(std::string mailUser, std::string oldName, std::string newName)
{
  std::cout << "OldUsername = " << oldName << std::endl << "NewUsername = " << newName << std::endl;
  std::string     valueInBDD;
  
  valueInBDD = checkIfExist(_collection, "username", oldName);
  if (valueInBDD == "") {
    std::cout << "Old name doesn't exist" << std::endl;
    return 0;
  }
  
  //checkMail before
  //valueInBDD = checkIfExist(_collection, "password",  newPass);
  updateContentInBDD(_collection, "username", mailUser, newName);
  return 0;
}

size_t  BddManager::updateMailUser(std::string oldMail, std::string newMail)
{
  std::string     valueInBDD;
  
  std::cout << "Before update" << std::endl;
  printCollection(_collection);
  valueInBDD = checkIfExist(_collection, "email", oldMail);
  if (valueInBDD == "") {
    std::cout << "Old mail doesn't exist" << std::endl;
    return 1;
  }
  valueInBDD = checkIfExist(_collection, "email", newMail);
  if (valueInBDD != "") {
    std::cout << "New mail already exist" << std::endl;
    return 2;
  }
  updateContentInBDD(_collection, "email", oldMail, newMail);
  std::cout << "After update" << std::endl;
  printCollection(_collection);
  return 0;
}

/*size_t	BddManager::updateMailUser(std::string oldMail, std::string newMail)
{
	std::string	valueInBDD;

	std::cout << "Before update" << std::endl;
	printCollection(_collection);
	valueInBDD = checkIfExist(_collection, "email", oldMail);
	if (valueInBDD == "") {
		std::cout << "Old mail doesn't exist" << std::endl;
		return 1;
	}
	valueInBDD = checkIfExist(_collection, "email", newMail);
	if (valueInBDD != "") {
		std::cout << "New mail already exist" << std::endl;
		return 2;
	}
	updateContentInBDD(_collection, "email", oldMail, newMail);
	std::cout << "After update" << std::endl;
	printCollection(_collection);
	return 0;
	}*/

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

/*void	BddManager::updateContentInBDD(auto collection, std::string field, std::string oldValue, std::string newValue)
  {
  bsoncxx::builder::stream::document document{};
  
  collection.update_one(document << field << oldValue <<
  bsoncxx::builder::stream::finalize,
  document << "$set" <<
  bsoncxx::builder::stream::open_document <<
  field << newValue << bsoncxx::builder::stream::close_document
  << bsoncxx::builder::stream::finalize);
  }*/

void    BddManager::updateContentInBDD(auto collection, std::string field, std::string mail, std::string newValue)
{
  bsoncxx::builder::stream::document document{};
  
  collection.update_one(document << "email" << mail <<
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

std::string	BddManager::getTime()
{
	auto end = std::chrono::system_clock::now();
	std::time_t end_time = std::chrono::system_clock::to_time_t(end);

	return std::ctime(&end_time);
}

std::string	BddManager::cryptPass(std::string nonHashPass)
{
	byte    key[32];
	byte    iv[CryptoPP::AES::BLOCKSIZE];
	memset(iv, 0x00, CryptoPP::AES::BLOCKSIZE);
	memset(key, 0x00, 32);
	
	std::string ciphertext;
	std::string decryptedtext;
	//std::string finalCipher;
	std::stringstream finalCipher;
	
	CryptoPP::AES::Encryption aesEncryption(key, 32);
	CryptoPP::CBC_Mode_ExternalCipher::Encryption cbcEncryption(aesEncryption, iv);
	
	CryptoPP::StreamTransformationFilter stfEncryptor(cbcEncryption,
							  new CryptoPP::StringSink(ciphertext));
	stfEncryptor.Put( reinterpret_cast<const unsigned char*>( nonHashPass.c_str() ), nonHashPass.length() );
	stfEncryptor.MessageEnd();
	
	//std::cout << "Cipher Text (" << ciphertext.size() << " bytes)" << std::endl;
	
	for( int i = 0; i < ciphertext.size(); i++ ) {
	  //std::cout << "0x" << std::hex << (0xFF & static_cast<byte>(ciphertext[i])) << " ";
	  //std::cout << std::hex << (0xFF & static_cast<byte>(ciphertext[i]));
	  //finalCipher.push_back(std::cout << std::hex << (0xFF & static_cast<byte>(ciphertext[i])));
	  finalCipher << std::hex << (0xFF & static_cast<byte>(ciphertext[i]));
	}

	//std::cout << std::endl << std::endl;
	//std::cout << "final:" << finalCipher.str() << std::endl;
	//std::cout << std::endl << std::endl;
	
	//                                                                                         
	// Decrypt                                                                                 
	//                                                                                         
	/*CryptoPP::AES::Decryption aesDecryption(key, 32);
	CryptoPP::CBC_Mode_ExternalCipher::Decryption cbcDecryption( aesDecryption, iv );
	
	CryptoPP::StreamTransformationFilter stfDecryptor(cbcDecryption, new CryptoPP::StringSink( \
												  decryptedtext ) );
	stfDecryptor.Put( reinterpret_cast<const unsigned char*>( ciphertext.c_str() ), ciphertext \
			  .size() );
			  stfDecryptor.MessageEnd();*/

	
	
	//                                                                                         
	// Dump Decrypted Text                                                                     
	//                                                                                         
	//std::cout << "Decrypted Text: " << std::endl;
	//std::cout << decryptedtext;
	//std::cout << std::endl;
	
	// return pass;                                                                            
	return (finalCipher.str());
}
