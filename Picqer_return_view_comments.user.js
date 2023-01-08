// ==UserScript==
// @name         Picqer add order comments to return
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nolimit2003.picqer.com/returns/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=picqer.com
// @downloadURL  https://github.com/MoneyMalibu/Picqer/raw/master/Picqer_return_view_comments.user.js
// @updateURL    https://github.com/MoneyMalibu/Picqer/raw/master/Picqer_return_view_comments.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const collectionComments = document.getElementsByClassName("comments-indication-icon");
    if(collectionComments.length > 0) {
        const collectionA = document.getElementById("content").getElementsByTagName("A");
        for (let i = 0; i < collectionA.length; i++) {
            if(collectionA[i].href.indexOf("orders") > 0){
                let commentsURL = `/api/v1${collectionA[i].pathname}/comments`
                console.log(commentsURL);
                $.get(commentsURL, function(response) {
                    for (let x = 0; x < response.length; x++) {
                        var table = document.getElementsByClassName("picqer-table-vertical");
                        console.log(table);
                        table = table[1];
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        cell1.innerHTML = response[x].updated_at;
                        cell2.innerHTML = response[x].body;
                        cell1.style.backgroundColor = "red";
                        cell2.style.backgroundColor = "red";
                    }
                    console.log(response);
                });
            }
        }
    }
})();