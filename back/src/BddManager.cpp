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
#include "cryptopp/osrng.h"
#include "cryptopp/hex.h"

#include "rapidjson/document.h"
#include "rapidjson/writer.h"
#include "rapidjson/stringbuffer.h"

BddManager::BddManager()
{
  std::string dbUser = std::getenv("MONGO_INITDB_ROOT_USERNAME");
  std::string dbPass = std::getenv("MONGO_INITDB_ROOT_PASSWORD");
  if (!dbUser.empty() && !dbPass.empty()) {
    _conn = {mongocxx::uri{"mongodb://" + dbUser + ":" + dbPass + "@mongo:27017/?authSource=admin"}};
  } else {
    _conn = {mongocxx::uri{"mongodb://mongo:27017"}};
  }
  connect();
}

BddManager::~BddManager()
{
  //disconnect();
}

void	BddManager::connect()
{
  _userCollection = _conn["testdb"]["userCollection"];
  _carPartCollection = _conn["testdb"]["carPartCollection"];
}

size_t	BddManager::userConnect(std::string username, std::string password, std::string token)
{
  std::string	valueInBDD;
  
  valueInBDD = checkIfExist(_userCollection, "email", username);
  if (valueInBDD != "")
    {
      valueInBDD = valueInBDD.substr(valueInBDD.find("password") + 13);
      valueInBDD = valueInBDD.substr(0, valueInBDD.rfind("\", \"token\" : \""));
      if (valueInBDD.compare(cryptPass(password)) == 0)
	{
	  //mettre le token a jour + le temps
	  std::cout << "A new user is connected :" << username << std::endl;
	  return 0;
	}
      std::cout << "Bad password" << std::endl;
      return 1;
    }
  std::cout << "User dont exist" << std::endl;
  return 2;
}

size_t	BddManager::userRegister(std::vector<std::string> documentContent)
{
  std::string	valueInBDD;
  
  valueInBDD = checkIfExist(_userCollection, "username", documentContent[0]);
  if (valueInBDD != "")
    {
      std::cout << "User already exist" << std::endl;
      return 1;
    }
  valueInBDD = checkIfExist(_userCollection, "email", documentContent[2]);
  if (valueInBDD != "")
    {
      std::cout << "Mail already used" << std::endl;
      return 2;
    }
  bsoncxx::builder::stream::document document{};
  std::cout << "MDP avant hashage:" << documentContent[1] << std::endl;
  std::cout << "MDP après hashage:" << cryptPass(documentContent[1]) << std::endl;
  document << "username" << documentContent[0] << "email" << documentContent[2] << "password" << cryptPass(documentContent[1]) << "token" << "" << "date" << "" << "firstName" << documentContent[3] << "lastName" << documentContent[4] << "birthDay" << documentContent[5];
  addContentInBDD(_userCollection, document);
  std::cout << "A new user is registered :" << documentContent[0] << std::endl;
  
  return 0;
}

size_t	BddManager::checkIfUserIsAuth(std::string userToken, std::string password, std::string username, std::string mail)
{
  std::string	valueInBDD;

  /*valueInBDD = checkIfExist(_userCollection, "password", cryptPass(password));
  if (valueInBDD.compare("") == 0) {
    std::cout << "Password doesn't exist" << std::endl;
    return 1;
    }*/
  valueInBDD = checkIfExist(_userCollection, "token", userToken);
  if (valueInBDD.compare("") == 0) {
    std::cout << "UserToken doesn't exist" << std::endl;
    return 2;
  }
  valueInBDD = checkIfExist(_userCollection, "username", username);
  if (valueInBDD.compare("") != 0) {
    std::cout << "Username already exist" << std::endl;
    return 3;
  }
  valueInBDD = checkIfExist(_userCollection, "email", mail);
  if (valueInBDD.compare("") != 0) {
    std::cout << "Mail already exist" << std::endl;
    return 4;
  }
  return 0;
}

size_t  BddManager::updatePasswordUser(std::string token, std::string password)
{
  std::string     valueInBDD;

  if(password.compare("") == 0)
    return 1;
  updateContentInBDDViaToken(_userCollection, "password", token, cryptPass(password));
  return 0;
}

rapidjson::Document*	BddManager::getFullCarPart(std::string partName)
{
  std::string	valueInBDD;

  valueInBDD = checkIfExist(_carPartCollection, "name", partName);
  if (valueInBDD.compare("") == 0) {
    //return (std::make_pair(1, "Invalid part name"));
  }
  bsoncxx::builder::stream::document document{};
  bsoncxx::stdx::optional<bsoncxx::document::value> maybe_result =
    _carPartCollection.find_one(document << "name" << partName
				<< bsoncxx::builder::stream::finalize);
  if(maybe_result) {
    std::string name = bsoncxx::to_json(*maybe_result);
    std::string path = name;
    std::string description = name;
    std::string price = name;
    rapidjson::Document* document2 = new rapidjson::Document();
    document2->SetObject();
    rapidjson::Document::AllocatorType& allocator = document2->GetAllocator();
    rapidjson::StringBuffer strbuf;
    rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
    std::cout << name << std::endl;
    name.erase(0, name.find("\"name\" :") + 10);
    name.erase(name.find("\", \"photo\" "));
    path.erase(0, path.find("\"photo\" :") + 11);
    path.erase(path.find("\", \"descript"));
    description.erase(0, description.find("\"description\" :") + 17);
    description.erase(description.find("\", \"parts\""));
    //description.erase(description.rfind("\" }"));
    rapidjson::Value mdr(rapidjson::kArrayType);

    
    rapidjson::Value mdr2(rapidjson::kArrayType);
    while (price.find("month") != std::string::npos) {
      getAllPrices(&mdr2, &price, allocator);
    }
    
    rapidjson::Value test;
    rapidjson::Value s;
    s.SetObject();
    test.SetString(name.c_str(), allocator);
    s.AddMember("name", test, allocator);
    test.SetString(path.c_str(), allocator);
    s.AddMember("photo", test, allocator);
    test.SetString(description.c_str(), allocator);
    s.AddMember("description", test, allocator);
    s.AddMember("prices", mdr2, allocator);

    
    mdr.PushBack(s, allocator);
    document2->AddMember("data", mdr, allocator);
    return document2;
  }
  //return (std::make_pair(1, "Error encountered"));
}

void	BddManager::getAllPrices(rapidjson::Value *price, std::string *priceToParse, rapidjson::Document::AllocatorType &allocator)
{
  std::string mdr = *priceToParse;
  std::string mdr2 = *priceToParse;
  mdr.erase(0, mdr.find("\"month\" :") + 11);
  mdr.erase(mdr.find("\", \"price\" "));
  mdr2.erase(0, mdr2.find("\"price\" :") + 11);
  *priceToParse = mdr2;
  mdr2.erase(mdr2.find("\" }"));
  rapidjson::Value localPrice;
  rapidjson::Value monthFromStr;
  rapidjson::Value priceFromStr;
  localPrice.SetObject();
  monthFromStr.SetString(mdr.c_str(), allocator);
  priceFromStr.SetString(mdr2.c_str(), allocator);
  localPrice.AddMember("month", monthFromStr, allocator);
  localPrice.AddMember("price", priceFromStr, allocator);
  price->PushBack(localPrice, allocator);
  return;
}

rapidjson::Document*	BddManager::getCarPart(std::string partName)
{
  std::string	valueInBDD;
  
  valueInBDD = checkIfExist(_carPartCollection, "name", partName);
  if (valueInBDD.compare("") == 0) {
    //return (std::make_pair(1, "Invalid part name"));
  }
  bsoncxx::builder::stream::document document{};
  bsoncxx::stdx::optional<bsoncxx::document::value> maybe_result =
    _carPartCollection.find_one(document << "name" << partName
				<< bsoncxx::builder::stream::finalize);
  if(maybe_result) {
    std::string name = bsoncxx::to_json(*maybe_result);
    std::string	price = name;
    std::string path = name;
    rapidjson::Document* document2 = new rapidjson::Document();
    document2->SetObject();
    rapidjson::Document::AllocatorType& allocator = document2->GetAllocator();
    rapidjson::StringBuffer strbuf;
    rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
    name.erase(0, name.find("\"name\" :") + 10);
    name.erase(name.find("\", \"photo\" "));
    price.erase(0, price.rfind("\"price\" :") + 11);
    price.erase(price.find("\" }"));
    path.erase(0, path.find("\"photo\" :") + 11);
    path.erase(path.find("\", \"descript"));
    /*std::cout << "name:" << name << std::endl;
    std::cout << "price:" << price << std::endl;
    std::cout << "path:" << path << std::endl;*/
    rapidjson::Value mdr(rapidjson::kArrayType);
    rapidjson::Value test;
    rapidjson::Value s;
    s.SetObject();
    test.SetString(name.c_str(), allocator);
    s.AddMember("name", test, allocator);
    test.SetString(price.c_str(), allocator);
    s.AddMember("price", test, allocator);
    test.SetString(path.c_str(), allocator);
    s.AddMember("photo", test, allocator);
    mdr.PushBack(s, allocator);
    
    
    std::string jpp = "parts";
    rapidjson::Value  lolilol;
    lolilol.SetString(jpp.c_str(), allocator);
    document2->AddMember(lolilol, mdr, allocator);
    document2->Accept(writer);
    return document2;
  }
      //return (std::make_pair(1, "Error encountered"));
}

size_t  BddManager::updateNameUser(std::string token, std::string username, std::string firstname, std::string lastname)
{
  std::string     valueInBDD;

  if (username.compare("") != 0)
    updateContentInBDDViaToken(_userCollection, "username", token, username);
  if (firstname.compare("") != 0)
    updateContentInBDDViaToken(_userCollection, "firstName", token, firstname);
  if (lastname.compare("") != 0)
    updateContentInBDDViaToken(_userCollection, "lastName", token, lastname);
  return 0;
}

size_t  BddManager::updateDateInBDD(std::string mailUser, std::string date)
{
  std::string     valueInBDD;

  valueInBDD = checkIfExist(_userCollection, "email", mailUser);
  if (valueInBDD.compare("") == 0) {
    std::cout << "Mail doesn't exist" << std::endl;
    return 1;
  }
  updateContentInBDD(_userCollection, "date", mailUser, date);
  return 0;
}

size_t  BddManager::updateTokenInBDD(std::string mailUser, std::string token)
{
  std::string     valueInBDD;
  valueInBDD = checkIfExist(_userCollection, "email", mailUser);
  if (valueInBDD.compare("") == 0) {
    std::cout << "Mail doesn't exist" << std::endl;
    return 1;
  }
  updateContentInBDD(_userCollection, "token", mailUser, token);
  return 0;
}

size_t  BddManager::resetPassword(std::string mailUser, std::string newPassword)
{
  std::string     valueInBDD;
  
  valueInBDD = checkIfExist(_userCollection, "email", mailUser);
  if (valueInBDD == "") {
    std::cout << "The mail doesn't exist" << std::endl;
    return 1;
  }
  updateContentInBDD(_userCollection, "password", mailUser, cryptPass(newPassword));
  return 0;
}

size_t  BddManager::updateMailUser(std::string token, std::string mail)
{
  if (mail.compare("") == 0)
    return 1;
  updateContentInBDDViaToken(_userCollection, "email", token, mail);
  return 0;
}

rapidjson::Document*	BddManager::getInfoUser(std::string userToken, std::string userMail)
{
  std::string	valueInBDD;
  valueInBDD = checkIfExist(_userCollection, "token", userToken);
  if (valueInBDD.compare("") == 0) {
    std::cout << "Invalid token" << std::endl;
    return (NULL);
  }
  valueInBDD = checkIfExist(_userCollection, "email", userMail);
  if (valueInBDD.compare("") == 0) {
    std::cout << "Invalid email" << std::endl;
    return NULL;
  }
  bsoncxx::builder::stream::document document{};
  bsoncxx::stdx::optional<bsoncxx::document::value> maybe_result =
    _userCollection.find_one(document << "email" << userMail
			     << bsoncxx::builder::stream::finalize);
  if(maybe_result) {
    std::string userName = bsoncxx::to_json(*maybe_result);
    rapidjson::Document* document2 = new rapidjson::Document();
    std::string mail = userName;
    std::string firstName = userName;
    std::string lastName = userName;
    std::string birthDay = userName;
    document2->SetObject();
    rapidjson::Document::AllocatorType& allocator = document2->GetAllocator();
    rapidjson::StringBuffer strbuf;
    rapidjson::Writer<rapidjson::StringBuffer> writer(strbuf);
    userName.erase(0, userName.find("\"username\" :") + 14);
    userName.erase(userName.find("\", \"email\" ")); 
    mail.erase(0, mail.find("\"email\" :") + 11);
    mail.erase(mail.find("\", \"password\""));
    firstName.erase(0, firstName.find("\"firstName\" :") + 15);
    firstName.erase(firstName.find("\", \"lastName\""));
    lastName.erase(0, lastName.find("\"lastName\" :") + 14);
    lastName.erase(lastName.find("\", \"birthDay\""));
    birthDay.erase(0, birthDay.find("\"birthDay\" :") + 14);
    birthDay.erase(birthDay.find("\" }"));
    rapidjson::Value mdr(rapidjson::kArrayType);
    rapidjson::Value test;
    rapidjson::Value s;
    s.SetObject();
    test.SetString(userName.c_str(), allocator);
    s.AddMember("username", test, allocator);
    test.SetString(mail.c_str(), allocator);
    s.AddMember("email", test, allocator);
    test.SetString(firstName.c_str(), allocator);
    s.AddMember("firstName", test, allocator);
    test.SetString(lastName.c_str(), allocator);
    s.AddMember("lastName", test, allocator);
    test.SetString(birthDay.c_str(), allocator);
    s.AddMember("birthDay", test, allocator);
    mdr.PushBack(s, allocator);
    document2->AddMember("data", mdr, allocator);
    return document2;
  }
  return NULL;
}

size_t	BddManager::addCarPartInBDD(std::string name, std::vector<std::string> prices, std::string photo, std::string description)
{
  bsoncxx::builder::stream::document document{};
  bsoncxx::builder::stream::document document2{};
  auto it = prices.begin();
  auto it2 = it + 1;

  document << "name" << name << "photo" << photo << "description" << description;
  auto in_array = document << "parts" << bsoncxx::builder::stream::open_array;
  while (it2 < prices.end()) {
    in_array = in_array << bsoncxx::builder::stream::open_document << "month" << *it << "price" << *it2 << bsoncxx::builder::stream::close_document;
    it = it + 2;
    it2 = it2 + 2;
  }
  auto after_array = in_array << bsoncxx::builder::stream::close_array;
    
  addContentInBDD(_carPartCollection, document);
  std::cout << "A car part has been registered:" << name << std::endl;
  return 0;
}

void	BddManager::addAllPrices(bsoncxx::builder::stream::document *document, std::string month, std::string price)
{
  bsoncxx::builder::stream::document document2{};

  document2 << "month" << month << "price" << price;
  *document << "parts" << bsoncxx::builder::stream::open_array << document2 << bsoncxx::builder::stream::close_array;
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

size_t	BddManager::disconnectUser(std::string mailUser, std::string token)
{
  std::string     valueInBDD;
  
  valueInBDD = checkIfExist(_userCollection, "email", mailUser);
  if (valueInBDD.compare("") == 0) {
    std::cout << "Mail doesn't exist" << std::endl;
    return 1;
  }
  //FAIRE LE CHECK TOKEN
  updateTokenInBDD(mailUser, token);
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

void    BddManager::updateContentInBDDViaToken(auto collection, std::string field, std::string token, std::string newValue)
{
  bsoncxx::builder::stream::document document{};
  collection.update_one(document << "token" << token <<
			bsoncxx::builder::stream::finalize,
			document << "$set" <<
			bsoncxx::builder::stream::open_document <<
			field << newValue << bsoncxx::builder::stream::close_document
			<< bsoncxx::builder::stream::finalize);
}

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
  
  for (int i = 0; i < ciphertext.size(); i++) {
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

std::string     BddManager::generateRandomString(size_t size)
{
  CryptoPP::SecByteBlock key(CryptoPP::AES::DEFAULT_KEYLENGTH), iv(CryptoPP::AES::BLOCKSIZE);
  std::string random;
  
  CryptoPP::OS_GenerateRandomBlock(false, iv, iv.size());
  
  CryptoPP::HexEncoder hex(new CryptoPP::StringSink(random));
  hex.Put(iv, iv.size());
  hex.MessageEnd();
  if (random.size() > size) {
    random.erase(size, random.size());
  }
  std::cout << "Random String for password: " << random << std::endl;
  return random;
}

aho_corasick::trie	BddManager::generateTree()
{
  aho_corasick::trie	trie;

  trie.case_insensitive();
  auto cursor = _carPartCollection.find({});
  for (auto&& doc : cursor) {
    std::string name = bsoncxx::to_json(doc);
    name.erase(0, name.find("\"name\" :") + 10);
    name.erase(name.find("\", \"photo\" "));
    trie.insert(name.c_str());
  }
  return trie;
}

std::vector<std::string>	BddManager::parseKeyWordInTree(aho_corasick::trie trie, std::string keyWord)
{
  std::vector<std::string>	parsingResult;
  std::transform(keyWord.begin(), keyWord.end(), keyWord.begin(), ::tolower);
  auto	result = trie.parse_text(keyWord.c_str());
  auto mdr = result.begin();

  while (mdr != result.end()) {
    //std::cout << (*mdr).get_keyword() << " a la place " << (*mdr).get_index() << std::endl;
    parsingResult.push_back((*mdr).get_keyword());
    ++mdr;
  }
  std::stringstream ss(keyWord);
  std::istream_iterator<std::string> begin(ss);
  std::istream_iterator<std::string> end;
  std::vector<std::string> keyWordSplited(begin, end);
  auto it = keyWordSplited.begin();
  auto cursor = _carPartCollection.find({});
  for (auto&& doc : cursor) {
    std::string name = bsoncxx::to_json(doc);
    name.erase(0, name.find("\"name\" :") + 10);
    name.erase(name.find("\", \"photo\" "));
    std::string nameInLower = name;
    std::transform(nameInLower.begin(), nameInLower.end(), nameInLower.begin(), ::tolower);
    while (it < keyWordSplited.end()) {
      if (nameInLower.find(*it) != std::string::npos) {
	if (std::find(parsingResult.begin(), parsingResult.end(), name) == parsingResult.end())
          {
            parsingResult.push_back(name);
            it = keyWordSplited.end() - 1;
          }
      }
      ++it;
    }
    it = keyWordSplited.begin();
  }
  return parsingResult;
}
