# Sovelluksen käyttöönotto Azuressa

**Disclaimer: Nämä ohjeet on generoitu ja käännetty suomeksi käyttäen VSCoden Copilotia. Ei toiminut. Ilmeisesti ainakin location pitäisi muuttaa "Germany West Central", koska "Sweden Central" ei tarjoa tarvittavaa palvelua. Sain jotenkin luotua Azure Web Appin verkkosivujen kautta, mutta sisältö on vielä tyhjää. Alla on muutamia sivuja opiskeltavaksi: **

- https://learn.microsoft.com/en-us/azure/app-service/

Node.js-sovelluksen käyttöönotto Microsoft Azureen, seuraa näitä ohjeita:

1. **Asenna Azure CLI**: Jos et ole vielä asentanut, asenna Azure CLI [täältä](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

2. **Kirjaudu Azureen**: Avaa terminaali ja kirjaudu Azure-tilillesi.
    ```sh
    az login
    ```

3. **Luo resurssiryhmä**: Luo resurssiryhmä, johon resurssisi tallennetaan.
    ```sh
    az group create --name myResourceGroup --location "Sweden Central"
    ```

4. **Luo App Service -suunnitelma**: Luo App Service -suunnitelma.
    ```sh
    az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku FREE
    ```

5. **Luo Web App**: Luo web-sovellus.
    ```sh
    az webapp create --name myUniqueAppName --resource-group myResourceGroup --plan myAppServicePlan
    ```

6. **Ota koodi käyttöön**: Ota koodi käyttöön web-sovelluksessa Gitin avulla.
    ```sh
    az webapp deployment source config-local-git --name myUniqueAppName --resource-group myResourceGroup
    ```

    Tämä komento antaa sinulle Git-URL-osoitteen. Lisää tämä URL etäkohteeksi paikalliseen Git-repositorioon ja työnnä koodisi.
    ```sh
    git remote add azure <Git-URL>
    git push azure master
    ```

7. **Avaa sovellus selaimessa**: Avaa web-sovellus selaimessa.
    ```sh
    az webapp browse --name myUniqueAppName --resource-group myResourceGroup
    ```

Korvaa `myResourceGroup`, `myAppServicePlan` ja `myUniqueAppName` haluamillasi nimillä.