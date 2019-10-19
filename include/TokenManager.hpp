#ifndef TOKEN_MANAGER_HPP_
# define TOKEN_MANAGER_HPP_

#include <string>

class TokenManager
{
public:
	TokenManager();
	~TokenManager();
	std::string generateToken(void);
private:
};

#endif
