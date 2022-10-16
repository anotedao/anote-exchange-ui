import $ from "jquery";
import "regenerator-runtime/runtime.js";

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
    $("#step1").fadeOut(function() {
        $("#step2").fadeIn();
    });
});

$("#buttonExchange2").on( "click", function() {
    $("#step2").fadeOut(function() {
        $("#step3").fadeIn();
    });
});

$("#buttonBack").on( "click", function() {
    $("#step2").fadeOut(function() {
        $("#step1").fadeIn();
    });
});