# websign-demo

Steps to install and run the demo

    npm i
    npm run build
    npm start
    
Then open a browser and go to the address 

 - http://localhost:8080/clean : for the original
 - http://localhost:8080/websign: for the websign integration demo
 
 Variabili da ambiente da configurare:
 
 * WEBSIGNDEMO_ENDPOINT: endpoint (completo di porta e prefisso api) su cui e' deployata questa demo, es "http://websign-demo.kopjra.com"
 * WIAS_ENDPOINT: endpoint (completo di porta e prefisso api) su cui e' deployato wias, es "http://wias.kopjra.com"
 * WIAS_APIKEY: token di autenticazione per wias   
