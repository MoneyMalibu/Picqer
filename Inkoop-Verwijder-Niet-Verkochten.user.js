// ==UserScript==
// @name         Picqer - Inkoop - Verwijderen niet verkochte
// @namespace
// @version      0.1
// @description  Take over the world!
// @author       MoneyMalibu
// @match        https://nolimit2003.picqer.com/purchaseorders/create
// @grant        none
// ==/UserScript==

(function() {

    var para = document.createElement("button");
    para.innerHTML = "VERWIJDER NIET VERKOCHTE PRODUCTEN!";
    para.id = "ProductenVerwijderen";
    var x = document.getElementsByClassName("modal-title");
    x[0].appendChild(para);

    para.addEventListener("click", VerwijderenProducten);



})();

function VerwijderenProducten() {

    var ProductenLijst = document.getElementsByTagName("tbody");
    debugger;
    var TotaalProductRegels = ProductenLijst[0].childNodes;
    debugger;

    for (var PR = TotaalProductRegels.length-1; PR > -1 ; PR--) {
        debugger;
        var AantalVerkocht = parseInt(ProductenLijst[0].childNodes[PR].childNodes[8].childNodes[0].nodeValue);
        debugger;
        var VerwijderenOfNiet = false
        if(AantalVerkocht === 0){
            VerwijderenOfNiet = true;
        }
        if(VerwijderenOfNiet === true) {
            ProductenLijst[0].childNodes[PR].remove();
        }
    }



    var Tables = document.getElementsByTagName("table");
    for (var table = Tables.length-1; table > -1 ; table--) {
        if (Tables[table].innerText.indexOf("Meer links toevoegen per rubriek") > -1) {
            //debugger;

        };
    };
};

