#!/usr/bin/python3

import os
import urllib3
import requests
import bs4
import sys
import config
import datetime
import unicodedata
import unidecode

#Ci-dessous quelque url du site rosepassion afin d'avoir des rapels de leur structures/syntaxe

#https://www.rosepassion.com/fr/pieces-porsche-356-pre-a-1955-eu-1300-506-2-cabrio-pre-a-boite-manuelle-4-vitesses

#https://www.rosepassion.com/fr/pieces-porsche-356-pre-a-1950-eu-1100-369-cabrio-pre-a-boite-manuelle-4-vitesses

#https://www.rosepassion.com/fr/pieces-porsche-912-1966-eu-912-1-6-coupe-boite-manuelle-4-vitesses

##https://www.rosepassion.com/fr/pieces-porsche//model+variante1///année//variante2//carosserie//boite-de-vitesse//

def main():
    for url in config.URLARRAY:
        model, brand = getModel(url)
    #Construction des url des different models de voiture à partire du fichier config.py
        schem_list = []
    
        #(A faire) boucle pour tout les modeles de voiture
        res = requests.get(url)
        if res.status_code != 200:
            print("Error code retour: {}".format(res.status_code))
            #sys.exit(1)
        else:
            soup = bs4.BeautifulSoup(res.text, 'lxml')
            #Recupération des liens pour les differentes famille de piece détaché (Moteur/Allumage/Embrayage)
            familyList = getFamilyPiece(soup)
        
            #Récupération des liens vers les schémas (et leur liste de pieces détaché)
            for family in familyList:
                res2 = requests.get(family)
                caterogiesArr = family.split("/")
                myCategorie = normalizeCat(caterogiesArr[len(caterogiesArr) - 1])
                
                #myCategorie = caterogiesArr[len(caterogiesArr)-1].replace('-', ' ')
                #myCategorie = {"name": myCategorie}
                #print("MDR: {}".format(myCategorie))
                #myCategorie2 = caterogiesArr[len(caterogiesArr) -2].replace('-', ' ')
                #myCategorie2 = {"name": myCategorie2}
                if res2.status_code != 200:
                    print("Error code retour: {}".format(res2.status_code))
                else:
                    soup2 = bs4.BeautifulSoup(res2.text, 'lxml')
                    tmp2_list = soup2.find_all("div", class_="bloc to_that h_child")
                    for schema in tmp2_list:
                        schem_list.append(schema.find("a").get("href"))
                    
                    #print("schem: {}".format(schem_list))
                    #Récupération, formatage en json et envoie en BDD via url des données de la pieces détachée
                    for i in schem_list:
                        caterogiesArr = i.split("/")
                        myCategorie2 = normalizeCat(caterogiesArr[len(caterogiesArr) - 1])
                        
                        res = requests.get(i)
                        if res.status_code != 200:
                            print("Error code retour: {}".format(res.status_code))
                            sys.exit(1)
                        soup = bs4.BeautifulSoup(res.text, 'lxml')
                        piecesList = []
                    
                        tmp = soup.select('div[class="liste"] > a[href]')
                        for a in tmp:
                            if a.find('span', class_="ref").getText() != "Plusieurs versions disponibles":
                                piecesList.append(a['href'].replace(' ', ''))
                        for url in piecesList:
                            Name = unidecode.unidecode(getName(url).replace('•', '-').replace('/', '').replace('\\', '')).replace('"', '').replace(' ', '-').replace('\'', '')
                            Price = getPrice(url).strip().replace('T', '').replace('C', '').replace('€', '').replace(' ', '').strip()
                            if Price != "Pluslivrable":
                                Description = getDescription(url)
                                photo = getImage(url, Name)
                                print("Photo: {}".format(photo))
                                categories = []
                                categories.append(myCategorie)
                                categories.append(myCategorie2)
                                month = datetime.datetime.now().strftime("%b")
                                my_json = {"name":Name,"prices":Price,"photo":photo,"description":Description, "month":month, "categories":categories, "model":model, "brand":brand}
                                #print("MyJson : {}".format(my_json))
                                #res = requests.post(config.URLGEAR+"addCarPart", json=my_json)
                                #print(res)
                            else:
                                print("Plus Livrable :(")
                    schem_list.clear()
    return

def normalizeCat(cat):
    #print("Test: {}".format(cat))
    tmpCategori = cat.split('-')
    categorie = ""
    it = 0
    while it < len(tmpCategori)-1:
        #print("Test2 : {}".format(tmpCategori[it]))
        categorie = categorie + ' ' + tmpCategori[it]
        it +=1
    categorie = {"name": categorie.strip()}
    return categorie

def getImage(url, Name):
    res = requests.get(url)
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.select('a[class="chocolat-image"] > img')
    for i in tmp:
        DlImage(i['src'].replace(u'\xa0', u' '), config.PATHIMAGE + Name + '.jpg')
    myName = config.IMAGEURL + Name + '.jpg'
    return myName

def getDescription(url):
    description = ""
    res = requests.get(url)
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    #print("URL PIECE: {}".format(url))
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.select('div[class="detail"]')
    tmp = tmp[0].select('ul > li')
    for i in tmp:
        #print(i)
        if i.find("span").getText().replace(u'/xe9', 'e') == "Poids :":
            description = i.find('p').getText()
    return description

def DlImage(url, Filename):
    http = urllib3.PoolManager()
    pic = http.request('GET', url)
    print("Filename: {}".format(Filename.encode('utf-8')))
    with open(Filename.encode('utf-8'), 'wb') as localFile:
        localFile.write(pic.data)
    return

def getModel(url):
    currentModel = "No Model"
    currentBrand = "No Year"
    for model in config.URLMODEL:
        if url.find(model) != -1:
            currentModel = model
    for brand in config.BRAND:
        if url.find(brand) != -1:
            currentBrand = brand
    return currentModel, currentBrand

def constructUrl_rose():
    list = []
    for model in config.URLMODEL:
        for annee in config.URLANNEE:
            for variante in config.URLVARIANT:
                for carrosserie in config.URLCARROSERIE:
                    for boite in config.URLBOITEVITESSE:
                        list.append(config.URLRACINE + '-' + model + '-' + annee + '-' + variante + '-' + carrosserie + '-' + boite)
    return list

def getFamilyPiece(soup):
    link_list = []
    tmp = soup.find_all(class_="col-lg-2 col-md-3")
    for family in tmp:
        link_list.append(family.find('a').get('href'))
        #print(family.find('a').get('href'))
    return link_list

#Inutilisé (recupération des liens dynamique necessaire)
def beginscan(url):
    list = []
    res = requests.get(url)
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.find_all("div", class_="bloc col-md-4 col-lg-5ths ")
    tmp1 = tmp[0].find_all("a")
    for data in tmp1:
        list.append(data.get('data-url'))
    res = requests.get(list[0])
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.find_all("h3")
    for data in tmp:
        test = data.next_sibling.next_sibling
    return list

def getList(url):
    list = []
    res = requests.get(url)
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.select('div[class="liste"] > a')
    for i in tmp:
        list.append(i.get('href'))
    return list

def getName(url):
    name = ''
    res = requests.get(url)
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.find('h1')
    name = tmp.getText()
    return name

def getPrice(url):
    res = requests.get(url)
    if res.status_code != 200:
        print("Error code retour: {}".format(res.status_code))
        sys.exit(1)
    soup = bs4.BeautifulSoup(res.text, 'lxml')
    tmp = soup.select('div > span[class="prix"]')
    price = tmp[0].getText()
    return price

if __name__ == "__main__":
    # execute only if run as a script
    main()