//
// EPITECH PROJECT, 2019
// main
// File description:
// main
//

#include <cryptopp/hex.h>
#include <cryptopp/aes.h>
#include <cryptopp/osrng.h>
#include <cryptopp/cryptlib.h>
#include <iostream>
#include "../include/TokenManager.hpp"

TokenManager::TokenManager(){
}

TokenManager::~TokenManager(){
}

std::string	TokenManager::generateToken(void)
{
  CryptoPP::SecByteBlock	key(20);
  std::string		KeyForRandom;
  byte			RandomHash[20];
  
  CryptoPP::OS_GenerateRandomBlock(true, key, key.size());
  CryptoPP::OS_GenerateRandomBlock(false, RandomHash, 20);
  
  CryptoPP::HexEncoder hex(new CryptoPP::StringSink(KeyForRandom));
  hex.Put(key, key.size());
  hex.MessageEnd();
  
  std::string	mdr(reinterpret_cast<const char *>(RandomHash), 20);
  hex.Detach(new CryptoPP::StringSink(mdr));
  hex.Put(RandomHash, 20);
  hex.MessageEnd();
  
  //std::cout << "Key:" << KeyForRandom << std::endl;
  return KeyForRandom;
}
