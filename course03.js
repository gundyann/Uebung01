"use strict";

function Char(value, string) {
  this.value = value;
  this.string = string;
}

function Font(name, alphabet, morseAlphabet) {
  this.name = name;
  this.alphabet = alphabet;
  this.morseAlphabet = morseAlphabet;
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


/*Renders a given Text. This will turn any text into
morse code. Each char will be seperated with a '/' charackter.*/
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

/*Renders a given morse String into the right characters.*/
Font.prototype.renderToChar = function(text) {
  var resultString = "";
  var textArray = text.toLowerCase().split(' ');
  console.log(textArray);
  for (var i = 0; i < textArray.length; i++) {
    if (textArray[i] != "") {
      if (this.morseAlphabet[textArray[i]]) {

        resultString = resultString + this.morseAlphabet[textArray[i]];
      } else {
        resultString = resultString + '_';
      }
    }
  }

  return resultString;
}

//Parse the alphabetString into the unique chars and filling them into the morse font.
Font.prototype.fillFont = function(alphabetString) {
  var alphabetArray = alphabetString.split(';');
  for (var i = 0; i < alphabetArray.length; i++) {
    var charToMorse = alphabetArray[i].split("=");
    var char = new Char(charToMorse[0], charToMorse[1]);
    this.alphabet[char.value] = char.string;
    this.morseAlphabet[char.string] = char.value;
  }
}

//The Alphabet as a String ready to be parsed.
var alphabetString = "a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
  "m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
  "y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..";


//The Font containing all the parsed Chars.
var morseFont = new Font("Morse", {}, {});
morseFont.fillFont(alphabetString);




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
