# puhelinluettelo-full-stack
Fullstackopen -kurssin puhelinluettelo sovellus.
Sovellus vastaa tehtäviin 
- [3.1 - 3.6](https://fullstackopen.com/osa3/node_js_ja_express#tehtavat-3-1-3-6)
- [3.7 ja 3.8](https://fullstackopen.com/osa3/node_js_ja_express#tehtavat-3-7-3-8)
- [3.9 - 3.11](https://fullstackopen.com/osa3/sovellus_internetiin#tehtavat-3-9-3-11)
- [3.12](https://fullstackopen.com/osa3/tietojen_tallettaminen_mongo_db_tietokantaan#tehtava-3-12)
- [3.13 - 3.14](https://fullstackopen.com/osa3/tietojen_tallettaminen_mongo_db_tietokantaan#tehtavat-3-13-3-14)

## Käytetyt tunnit
  Tunnit | Tehtävä      |
| -----  | ------------ |
| 3 | Opiskeltu osaa 3a node.js ja express |
| 1 | Luotu ja alustettu uusi projekti, tehty tehtävä 3.1 |
| 1 | Tehty tehtävät 3.2 - 3.6 |
| 1 | Tehty tehtävät 3.7 ja 3.8 |
| 2 | Opiskelut osaa 3b Sovellus internettiin | 
| 2 | Tehty tehtävät 3.9 - 3.11 |
| 2 | Opiskeltu Azuren käyttöä |
| 1 | Opiskeltu MongoDB:n käyttöä |
| 2 | Tehty tehtävä 3.12 |
| 1 | Opiskeltu tietokantaa käyttävää palvelinta |
| 1 | Tehty tehtävä 3.13 |
| **15**  | **Yhteensä** |

## Muistiinpanot
- Opiskeltu osa3 [node.js ja express](https://fullstackopen.com/osa3/node_js_ja_express) ja luotu osiossa esitelty [esimerkki-sovellus](https://github.com/sakluk/fullstack-mooc/tree/main/osa3/esimerkki)
- Tutustuttu [HTML semantiikkaan](https://www.rfc-editor.org/rfc/rfc9110.html) ja [media sisältöihin](https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types)
- Asennettu VSCode [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), avattu [Postman-tili](https://www.postman.com/) ja asennettu [Postman-sovellus](https://www.postman.com/downloads/).
- Luotu uusi kansio [puhelinluettelo-full-stack](https://github.com/sakluk/puhelinluettelo-full-stack) GitHubiin
- Alustettu projekti antamalla komento `npm init`
- Asennettu express `npm install express` 
- Päivitetty projekti `npm update`
- Asennettu nodemon `npm install --save-dev nodemon`
- Lisätty `package.json` tiedostoon "start" ja "dev" komennot
- Annettu gitissä Github-tilin user.name and user.email
    ```bash
    git config --global user.email "your_email@example.com"
    git config --global user.name "Your Name"
    ```
- Kopioitu pohjaksi esimerkin `ìndex.js`
- Lisätty `persons` lista ja muutettu `index.js` vastaamaan puhelinluettelon käsittelyä
- Lisätty `/info` sivu (tehtävä 3.2)
- Lisätty yksittäisen henkilön tietojen näyttö (tehtävä 3.3)
- Lisätty puhelintietojen poisto (tehtävä 3.4)
- Lisätty puhelintietojen lisääminen (tehtävä 3.5)
- Lisätty uuden numeron virheiden käsittely (tehtävä 3.6)
- Luettu Middleware osio, opiskeltu [morganin](https://github.com/expressjs/morgan) käyttöä
- Asennettu morgan `npm install morgan`
- Lisätty morgan loggaamaan konsoliin (tehtävä 3.7)
- Muokattu Copilotin avulla morgan näyttämään HTTP POST -pyyntöjen mukana tulevan datan, lisätty koodiin kommentit Copilotin käytöstä
- Opiskeltu [miten viedään sovellus internettiin](https://fullstackopen.com/osa3/sovellus_internetiin)
- Asennettu cors `npm install cors` ja lisätty `cors` palvelimeen
- Fly.io näytti olevan nykyään (28.12.2024) maksullinen, joten otin käyttöön [Render] GitHub-tunnuksilla
- Lisätty "build:ui" ja "build:full" skriptit palvelimen `package.json` tiedostoon
- Vaihdettu selain(front)-puolen `persons.js` baseUrl 
- Lisätty selain-puolen `vite.config.json` tiedostoon proxyn käyttö
- Viety https://dashboard.render.com/, näyttäisi toimivan
- Opiskeltu [miten sovellus otetaan käyttöön Microsoft Azuressa](https://learn.microsoft.com/en-us/azure/app-service/)
- Jatkettu opiskelua osasta 3c. [tietojen tallentaminen mongoDB-tietokantaan](https://fullstackopen.com/osa3/tietojen_tallettaminen_mongo_db_tietokantaan#mongo-db)
  - Avattu tili https://cloud.mongodb.com/
  - Luotu klusteri
  - Seurattu Connect to cluster ohjeita ja asennettu palvelinkoodiin mongoDB `npm install mongodb`
  - Jatkettu ohjeiden lukemista ja asennettu Mongoose `npm install mongoose`
  - Opiskeltu mongoDB:n toimintaa [mongo_test.js](./mongo_test.js) ja [mongoose_test.js](./mongoose_test.js) avulla
  - Suoritettu tehtävä 3.12 - koodi tallennettu [mongo.js](./mongo.js), muutettu `mongoose_test.js` nimetty uudelleen `mongo.js`
  - Jatkettu opiskelua: palvelun ja tietokanta
  - Asennettu dotenv `npm install dotenv`
  - Tehty tehtävä 3.13


Näiden tehtävien tekeminen oli suoraviivaisempaa, koska toteuttaessa yksinkertaisia taustapalvelimen resurssien kutsuja tai poistoja, pystyi ajattelemaan suoraviivaisesti pala kerrallaan, eikä tarvinnut pitää mielessä montaa asiaa. Tein jokaista REST-rajapinnan kutsua varten oman testikomennon, jotka kaikki on tallennettu [./requests](./requests)-kansioon.

MongoDB-tehtävän (3.12) kanssa oli vaikeuksia. Sain esimerkit toimimaan ja aloitin koodaamaan omaa versiota. Huomasin, että yhteyden avaaminen ei onnistunut ja jouduin palaamaan takaisin aiempiin yksinkertaisempiin esimerkkeihin. Muokkaamalla esimerkkikoodia vähän kerrallaan sain toimivan [mongo.js](./mongo.js) kirjoitettua.

Tehtävä 3.13 tekeminen meni kohtalaisen suoraviivaisesti. Henkilön poistaminen tietokannasta aiheutti jonkin verran päänvaivaa.

Edelleen hämmästelen kuinka hyvin Copilot tekee ensimmäisen arvauksen, kun koodiin tarvitsee tehdä lisäyksiä. Copilotin kirjoittamaa koodia on tarvinnut korjata hyvin vähän, jos ollenkaan. Esim. tehtävässä 3.8* antamalla Copilotille kehotteen: "Konfiguroi morgania näyttämään HTTP POST-pyyntöjen mukana tulevan datan", koodi oli valmis hetkessä.

