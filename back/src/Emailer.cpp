#include <curl/curl.h>
#include <chrono>
#include <iostream>
#include <ctime>
#include <algorithm>
#include <string.h>
#include "../include/Emailer.hpp"

std::vector<std::string> Emailer::_contentBuffer;

#define FROM    "gearstocks@gmail.com"
#define CC      "gearstocks@gmail.com"

struct upload_status {
  int lines_read;
};

size_t Emailer::payload_source(void *ptr, size_t size, size_t nmemb, void *userp)
{
  struct upload_status *upload_ctx = (struct upload_status *)userp;
  const char *data;
  
  if((size == 0) || (nmemb == 0) || ((size*nmemb) < 1)) {
    return 0;
  }
  data = (_contentBuffer[upload_ctx->lines_read]).c_str();
  
  if(data) {
    size_t len = strlen(data);
    memcpy(ptr, data, len);
    upload_ctx->lines_read++;
    
    return len;
  }  
  return 0;
}

int Emailer::sendMail(std::string userMail, std::string password, std::string mailType)
{
  CURL *curl;
  CURLcode res = CURLE_OK;
  struct curl_slist *recipients = NULL;
  struct upload_status upload_ctx;
  
  if (mailType.compare("passwordReset") == 0) {
    buildResetPasswordContentBuffer(userMail, password);
  }
  else
    buildRegisterConfirmationContentBuffer(userMail);
  
  upload_ctx.lines_read = 0;
  curl = curl_easy_init();
  if(curl) {
    curl_easy_setopt(curl, CURLOPT_USERNAME, "gearstocks@gmail.com");
    curl_easy_setopt(curl, CURLOPT_PASSWORD, "piabeyoyxoyukozo");
    curl_easy_setopt(curl, CURLOPT_URL, "smtps://smtp.gmail.com:465");
#ifdef SKIP_PEER_VERIFICATION
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, 0L);
#endif
#ifdef SKIP_HOSTNAME_VERIFICATION
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYHOST, 0L);
#endif
    curl_easy_setopt(curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_easy_setopt(curl, CURLOPT_MAIL_FROM, FROM);
    recipients = curl_slist_append(recipients, userMail.c_str());
    recipients = curl_slist_append(recipients, CC);
    curl_easy_setopt(curl, CURLOPT_MAIL_RCPT, recipients);
    curl_easy_setopt(curl, CURLOPT_READFUNCTION, payload_source);
    curl_easy_setopt(curl, CURLOPT_READDATA, &upload_ctx);
    curl_easy_setopt(curl, CURLOPT_UPLOAD, 1L);
    curl_easy_setopt(curl, CURLOPT_VERBOSE, 1L);
    res = curl_easy_perform(curl);
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
    curl_slist_free_all(recipients);
    curl_easy_cleanup(curl);
  }
  return (int)res;
}

int	Emailer::buildResetPasswordContentBuffer(std::string userMail, std::string password)
{
  std::string time = getTime();

  if (_contentBuffer.empty() == 0) {
    std::cout << "ON CLEAN LE BUFFER" << std::endl;
    _contentBuffer.clear();
  }
  time.erase(std::remove(time.begin(), time.end(), ' '), time.end());
  time.erase(std::remove(time.begin(), time.end(), ':'), time.end());
  time.erase(time.length() -1, time.length());
  std::string ID = "Message-ID: <" + time + "@gearstocks.com>\r\n";
  _contentBuffer.push_back("Date: Mon, 08 Mar 2020 11:54:29 +1100\r\n");
  _contentBuffer.push_back("To : " + userMail + "\r\n");
  _contentBuffer.push_back("From: gearstocks@gmail.com (GearStocks)\r\n");
  _contentBuffer.push_back("Cc: \r\n");
  _contentBuffer.push_back(ID);
  _contentBuffer.push_back("Subject: Password reset\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("Bonjour,\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("Vous venez de signaler une perte de votre mot de passe sur la plateforme GearStocks.\r\n");
  _contentBuffer.push_back("Voici votre nouveau mot de passe: " + password + "\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("Vous pouvez utiliser ce mot de passe pour vous connecter et modifier vrtre mot de passe sur votre profile.\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("Cordialement,\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("GearStocks\r\n");
  _contentBuffer.push_back("");
}

int	Emailer::buildRegisterConfirmationContentBuffer(std::string userMail)
{
  std::string time = getTime();

  if (_contentBuffer.empty() == 0) {
    std::cout << "ON CLEAN LE BUFFER" << std::endl;
    _contentBuffer.clear();
  }
  time.erase(std::remove(time.begin(), time.end(), ' '), time.end());
  time.erase(std::remove(time.begin(), time.end(), ':'), time.end());
  time.erase(time.length() -1, time.length());
  std::string ID = "Message-ID: <" + time + "@gearstocks.com>\r\n";
  _contentBuffer.push_back("Date: Mon, 08 Mar 2020 11:54:29 +1100\r\n");
  _contentBuffer.push_back("To : " + userMail + "\r\n");
  _contentBuffer.push_back("From: gearstocks@gmail.com (GearStocks)\r\n");
  _contentBuffer.push_back("Cc: \r\n");
  _contentBuffer.push_back(ID);
  _contentBuffer.push_back("Subject: Confirmation d'inscription\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("Bonjour,\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("Vous venez bien de vous enregistrer sur la plateforme GearStocks.\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("Cordialement,\r\n");
  _contentBuffer.push_back("\r\n");
  _contentBuffer.push_back("GearStocks\r\n");
  _contentBuffer.push_back("");
}

std::string     Emailer::getTime()
{
  auto end = std::chrono::system_clock::now();
  std::time_t end_time = std::chrono::system_clock::to_time_t(end);
  
  return std::ctime(&end_time);
}

int	Emailer::sendMailDependingOnType(std::string userMail, std::string password, std::string mailType)
{
  sendMail(userMail, password, mailType);
  return 0;
}

Emailer::Emailer()
{
}

Emailer::~Emailer()
{
}
