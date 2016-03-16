$(function() {
    $( "#tabs" ).tabs();
    $( "#accordion" ).accordion();
});

//EDITEUR DE text
var doc;

function initDoc(){
    doc = document.getElementById("textBox");
}

function formatDoc(sCmd){
    doc.focus();
    document.execCommand(sCmd, false, null);
}
