#ifndef EMAILER_HPP_
# define EMAILER_HPP_

#include <string>
#include <vector>

class Emailer
{
public:
  Emailer();
  ~Emailer();
  int sendMailDependingOnType(std::string userMail, std::string password, std::string mailType, std::string object, std::string content, std::string name);
private:
  int   sendMail(std::string userMail, std::string password, std::string mailType, std::string object, std::string content, std::string name);
  static size_t payload_source(void *ptr, size_t size, size_t nmemb, void *userp);
  int   buildResetPasswordContentBuffer(std::string userMail, std::string password);
  int   buildRegisterConfirmationContentBuffer(std::string userMail);
  int   buildContactContentBuffer(std::string userMail, std::string object, std::string content, std::string name);
  static std::vector<std::string> _contentBuffer;
  std::string getTime();
};

#endif
