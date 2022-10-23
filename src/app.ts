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
var fromC = "waves";
var toC = "anote";
var type = "instant";

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
        if (amount != undefined) {
            $("#amountSend1").val(amount);
            $("#sendAmount").val(amount);
        }
        $("#step2Loading").fadeIn();
        $.getJSON("https://exchange.anote.digital/calculate/" + fromC + "/" + toC + "/" + amount, function(data) {
            $("#amountInstant").val(data.result_instant);
            $("#amountDelayed").val(data.result_delay);
            $("#amountReceive1").val(data.result_instant);
            $("#step2Loading").fadeOut();
        });
        $("#step1").fadeOut(function() {
            $("#step2").fadeIn();
        });
    }
});

$("#buttonExchange2").on( "click", function() {
    var address = $("#address").val();
    var amount = $("#amountSend").val();
    if (address?.toString().length == 0) {
        $("#messageError2").fadeIn(function(){
            setTimeout(function(){
                $("#messageError2").fadeOut();
            }, 500);
        });
    } else {
        $("#step2Loading").fadeIn();
        $.getJSON("https://exchange.anote.digital/trade/" + fromC + "/" + toC + "/" + amount + "/" + type + "/" + address, function(data) {
            $("#sendAddress").val(data.address);
            $("#step2Loading").fadeOut();
            $("#step2").fadeOut(function() {
                $("#step3").fadeIn();
                if (fromC == "anote") {
                    $.getJSON("https://nodes.wavesplatform.com/addresses/balance/" + address, function(data){
                        var address = $("#address").val();
                        waitForBalance(fromC, address, data.balance);
                    })
                } else {
                    $.getJSON("https://nodes.anote.digital/addresses/balance/" + address, function(data) {
                        var address = $("#address").val();
                        waitForBalance(fromC, address, data.balance);
                    })
                }
            });
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

$("#buttonToggle").on( "click", function() {
    var from = $("#from").html();
    var to = $("#to").html();
    $("#from").html(to);
    $("#to").html(from);
    var oldTo = toC;
    toC = fromC;
    fromC = oldTo;

    $("#ticker1").html(capitalizeFirstLetter(fromC));
    $("#ticker2").html(capitalizeFirstLetter(toC));
    $("#ticker3").html(capitalizeFirstLetter(toC));

    $("#ticker4").html(capitalizeFirstLetter(fromC));
    $("#ticker5").html(capitalizeFirstLetter(toC));
    $("#ticker6").html(capitalizeFirstLetter(toC));
});

$("#buttonCalc").on( "click", function() {
    var amount = $("#amountSend").val();
    if (amount?.toString().length == 0) {
        $("#messageError1").fadeIn(function(){
            setTimeout(function(){
                $("#messageError1").fadeOut();
            }, 500);
        });
    } else {
        if (amount != undefined) {
            $("#amountSend1").val(amount);
        }
        $("#calcLoading").fadeIn();
        $.getJSON("https://exchange.anote.digital/calculate/" + fromC + "/" + toC + "/" + amount, function(data) {
            $("#amountInstant").val(data.result_instant);
            $("#amountDelayed").val(data.result_delay);
            $("#amountReceive1").val(data.result_instant);
            $("#calcLoading").fadeOut();
        });
    }
});

$("#buttonInstant").on( "click", function() {
    $("#dropdownMenuTradeType").html("Instant");
    $("#step2Loading").fadeIn();
    var amount = $("#amountSend").val();
    $.getJSON("https://exchange.anote.digital/calculate/" + fromC + "/" + toC + "/" + amount, function(data) {
        $("#amountReceive1").val(data.result_instant);
        $("#step2Loading").fadeOut();
    });
    type = "instant";
});

$("#buttonDelayed").on( "click", function() {
    $("#dropdownMenuTradeType").html("Delayed");
    $("#step2Loading").fadeIn();
    var amount = $("#amountSend").val();
    $.getJSON("https://exchange.anote.digital/calculate/" + fromC + "/" + toC + "/" + amount, function(data) {
        $("#amountReceive1").val(data.result_delay);
        $("#step2Loading").fadeOut();
    });
    type = "delayed";
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function waitForBalance(from: string, address: any, balance: number) {
    if (from == "anote") {
        $.getJSON("https://nodes.wavesplatform.com/addresses/balance/" + address, function(data){
            if (balance == data.balance) {
                setTimeout(function(){
                    waitForBalance(from, address, data.balance);
                }, 1000);
            } else {
                $("#messageWait").fadeOut(function() {
                    $("#messageWait").html("Your trade is done!")
                    $("#step3Loading").hide();
                    $("#messageWait").fadeIn();
                });
            }
        })
    } else {
        $.getJSON("https://nodes.anote.digital/addresses/balance/" + address, function(data) {
            if (balance == data.balance) {
                setTimeout(function(){
                    waitForBalance(from, address, data.balance);
                }, 1000);
            } else {
                $("#messageWait").fadeOut(function() {
                    $("#messageWait").html("Your trade is done!")
                    $("#step3Loading").hide();
                    $("#messageWait").fadeIn();
                });
            }
        })
    }
}