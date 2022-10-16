// import "bootswatch/dist/darkly/bootstrap.min.css";
import $ from "jquery";
import "regenerator-runtime/runtime.js";
import copy from 'copy-to-clipboard';

class Exchange { 

    constructor() { 
        
    }

    getPage():string {
        return "main";
    }
}


var t;
var activeScreen = "home";

const exchange = new Exchange();

// Button bindings

function createTranslation() {
    var lang = $("#lang").val();
    $.getJSON("locales/" + lang + ".json", function( data ) {
        t = data.app;
        const page = exchange.getPage();
        $("#page-loading").fadeOut(function(){
            $("#page-" + page).fadeIn();
        });
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    createTranslation();
})

$("#buttonExchange").on( "click", function() {
    var amount = $("#amountSend").val();
    if (amount?.toString().length == 0) {
        $("#messageError1").fadeIn(function(){
            setTimeout(function(){
                $("#messageError1").fadeOut();
            }, 500);
        });
    } else {
        $("#step1").fadeOut(function() {
            $("#step2").fadeIn();
        });
    }
});

$("#buttonExchange2").on( "click", function() {
    var address = $("#address").val();
    if (address?.toString().length == 0) {
        $("#messageError2").fadeIn(function(){
            setTimeout(function(){
                $("#messageError2").fadeOut();
            }, 500);
        });
    } else {
        $("#step2").fadeOut(function() {
            $("#step3").fadeIn();
        });
    }
});

$("#buttonBack").on( "click", function() {
    $("#step2").fadeOut(function() {
        $("#step1").fadeIn();
    });
});

$("#buttonCopy1").on( "click", function() {
    var amount = $("#sendAmount").val();
    copy(String(amount));
    $("#messageCopy").fadeIn(function(){
        setTimeout(function(){
            $("#messageCopy").fadeOut();
        }, 500);
    });
});

$("#buttonCopy2").on( "click", function() {
    var address = $("#sendAddress").val();
    copy(String(address));
    $("#messageCopy").fadeIn(function(){
        setTimeout(function(){
            $("#messageCopy").fadeOut();
        }, 500);
    });
});