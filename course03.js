"use strict";

function Char(value, string) {
  this.value = value;
  this.string = string;
}

function Font(name, alphabet) {
  this.name = name;
  this.alphabet = alphabet;
}

/*Renders a given Text. This will turn any text into
morse code.*/
Font.prototype.render = function(text) {
  var resultString = "";
  var textArray = text.toLowerCase().split('');
  for (var i = 0; i < textArray.length; i++) {
    resultString = resultString + " " + this.alphabet[textArray[i]];
  }
  return resultString;
};

Font.prototype.renderWithSlash = function(text) {
  var resultString = "";
  var textArray = text.toLowerCase().split('');
  for (var i = 0; i < textArray.length; i++) {
    resultString = resultString + " / " + this.alphabet[textArray[i]];
  }
  return resultString;
}

/*Renders the text and passes it to the given
function or returns the Text if no Function is given.*/
Font.prototype.write = function(text, to) {
  if (to) {
    to(this.render(Text));
  } else {
    return this.render(text);
  }
}

//Parse the alphabetString into the unique chars and filling them into the morse font.
Font.prototype.fillFont = function(alphabetString) {
  var alphabetArray = alphabetString.split(';');
  for (var i = 0; i < alphabetArray.length; i++) {
    var charToMorse = alphabetArray[i].split("=");
    var char = new Char(charToMorse[0], charToMorse[1]);
    this.alphabet[char.value] = char.string;
  }
}

//The Alphabet as a String ready to be parsed.
var alphabetString = "a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
  "m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
  "y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..";


//The Font containing all the parsed Chars.
var morseFont = new Font("Morse", {});
morseFont.fillFont(alphabetString);
console.log(morseFont);



//Wenn wir eine function überschreiben. machen wir es so:

/*
morseFont.__proto__.render = function(text){
  var resultString = "";
  var textArray = text.toLowerCase().split('');
  for (var i = 0; i < textArray.length; i++) {
    resultString = resultString + " / " + this.alphabet[textArray[i]];
  }
  return resultString;
}
*/
