//
// EPITECH PROJECT, 2019
// main
// File description:
// main
//

#include <iostream>
#include "../include/BddManager.hpp"

int	main(void)
{
	BddManager *mdr = new BddManager();

	mdr->userConnect("fifi", "1234");
	delete(mdr);
	return 0;
}
