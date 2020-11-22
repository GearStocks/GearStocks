#!usr/bin/python3

import requests
import bs4
import sys
import config

def main():
    print("Test")
    for url in config.URLSLIST:
        print(getPrice(url))
        getName(url)
    return

def getName(url):
    name = ''
    res = requests.get(url)
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.select('h1')
    print(tmp[0])
    #print(tmp[0].getText())
    return name

def getPrice(url):
    res = requests.get(url)
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.select('div > span[class="price"]')
    #print(tmp[0].getText())
    price = tmp[0].getText()
    return price

if __name__ == "__main__":
    # execute only if run as a script
    main()