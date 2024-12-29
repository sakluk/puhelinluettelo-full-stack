# Sovelluksen käyttöönotto Azuressa

**Disclaimer: Nämä ohjeet on generoitu ja käännetty suomeksi käyttäen VSCoden Copilotia. Kirjautimine Azureen toimi, mutta resurssiryhmän luomisen kanssa oli jo ongelmia. Location: Sweden Central ei tarjoa Free-pakettia, vaan se ainakin pitäisi vaihtaa "Germany West Central". Tarvitsee testata ja korjata ohjeet.**

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