// ==UserScript==
// @name         Google price getter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.nl/search?*
// @match        https://www.google.nl/shopping/product/*
// @match        https://priceapi.azurewebsites.net/api/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.nl
// @grant        none
// ==/UserScript==


(function() {

    setTimeout(function(){
        location.href = `https://priceapi.azurewebsites.net/api/price`;
    }, 300000);


    //https://www.google.nl/search?output=search&tbm=shop&tbm=shop&q=8720589644021&oq=8720589644021
    if (document.URL.includes("google.nl/search?")) {
        const myTimeout = setTimeout(getProduct, 2000);

        async function getProduct() {

            const queryString = window.location.search;
            console.log(queryString);
            const urlParams = new URLSearchParams(queryString);
            const productEAN = urlParams.get('oq')
            console.log(productEAN);

            try {
                const collection = document.getElementsByClassName("iXEZD");
                if(collection.length > 0) {
                    //open nieuw window om aan te geven dat het product gevonden is
                    //var foundWindow = window.open(`https://priceapi.azurewebsites.net/api/price/setsearchtime?EAN=${productEAN}&found=true`,"", "width=300, height=300");
                    //await new Promise(r => setTimeout(r, 3000));
                    //foundWindow.close();
                    console.log(collection);
                    location.href = collection[0].href;
                } else {
                    // niet gevonden doorsturen naar de server
                    var notfoundWindow = window.open(`https://priceapi.azurewebsites.net/api/price/setsearchtime?EAN=${productEAN}&found=false`,"", "width=300, height=300");
                    await new Promise(r => setTimeout(r, 3000));
                    notfoundWindow.close();

                    setTimeout(function(){
                        location.href = `https://priceapi.azurewebsites.net/api/price`;
                    }, 5000);
                }
            } catch (error) {
                setTimeout(function(){
                    location.href = `https://priceapi.azurewebsites.net/api/price`;
                }, 10000);
            }
        }
    }

    if (document.URL.includes("google.nl/shopping/product/")) {
        const productPrice = setTimeout(getPrice, 5000);

        async function getPrice() {

            const queryString = window.location.search;
            console.log(queryString);
            const urlParams = new URLSearchParams(queryString);
            const productEAN = urlParams.get('oq')
            console.log(productEAN);


            const collection = document.getElementById("sh-osd__online-sellers-cont");
            const trCollection = collection.getElementsByClassName("sh-osd__offer-row");

            for (let i = 0; i < trCollection.length; i++) {

                const trCollectionSeller = trCollection[i].getElementsByClassName("b5ycib shntl");
                const sellerName = trCollectionSeller[0].childNodes[0].data;

                const trCollectionSellerPrice = trCollection[i].getElementsByClassName("g9WBQb fObmGc");
                if(trCollectionSellerPrice[0].childNodes.length > 0) {
                    var sellerPrice = trCollectionSellerPrice[0].childNodes[0].data;
                    sellerPrice = sellerPrice.slice(2, 99);
                    console.log(`Verkoper ${sellerName} voor een prijs van ${sellerPrice}`);

                    var priceLog = window.open(`https://priceapi.azurewebsites.net/api/price/setprice?EAN=${productEAN}&seller=${sellerName}&price=${sellerPrice}`,"", "width=300, height=300");
                    await new Promise(r => setTimeout(r, 2000));
                    priceLog.close();
                }

            }
            setTimeout(function(){
                location.href = `https://priceapi.azurewebsites.net/api/price`;
            }, 10000);
        }
    }

    if (document.URL.includes("priceapi.azurewebsites.net")) {

        var x = document.getElementsByTagName("BODY")[0];
        var xx = false;
        debugger;
        xx = x.innerHTML.includes("close this window");
        if(xx){

        } else {
            let url = 'https://priceapi.azurewebsites.net/api/price';
            var productResponse;
            try {
                const Http = new XMLHttpRequest();
                Http.open("GET", url);
                Http.send();

                Http.onreadystatechange = (e) => {
                    if(Http.readyState==4 && Http.status==200) {
                        productResponse = JSON.parse(Http.responseText);
                        console.log(productResponse);
                        localStorage.setItem('productSearch', Http.responseText);
                        setTimeout(function(){
                            location.href = `https://www.google.nl/search?output=search&tbm=shop&tbm=shop&q=${productResponse[0].ean}&oq=${productResponse[0].ean}`;
                        }, 5000);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }





    }
})();