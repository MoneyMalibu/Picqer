// ==UserScript==
// @name         Picqer | Volgende picklijst
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       MoneyMalibu
// @match        https://nolimit2003.picqer.com/picklists/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=picqer.com
// @grant        none
// ==/UserScript==


var picklijstActief = false;
var childNodeId = 0;

(function() {
    'use strict';

    if (window.location.href.indexOf("batches") < 0) {
        const collection = document.getElementsByClassName("picklist-progressbar");

        for ( let i = 0; i <= collection[0].childNodes.length; i++ ) {
            if(collection[0].childNodes[i].nodeName === 'A') {
                picklijstActief = true;
                childNodeId = i;
                break;
            }
        }

    }
    if(picklijstActief) {
        checkPicklistReady();
    }

})();

function checkPicklistReady(){
    const collection = document.getElementsByClassName("picklist-progressbar");
    var classname = collection[0].childNodes[childNodeId].className;
    if(classname === 'btn btn-default btn-primary') {
        setTimeout(function () {
            collection[0].childNodes[childNodeId].click();
        }, 10000);

    } else {
        setTimeout(function () {
            checkPicklistReady();
        }, 10000); // Elke 60seconde deze functie herhalen
    }
}