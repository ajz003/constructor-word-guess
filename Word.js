/*
Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

An array of new Letter objects representing the letters of the underlying word

A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.

A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
*/

var Letter = require("./Letter.js")

function Word(word) {
    this.wordArr = [];
    this.addLetters = function () {

        let letterArr = word.split('');

        for (let i = 0; i < letterArr.length; i++) {
            this.wordArr.push(new Letter(letterArr[i]));
        }


        this.wordStr = function () {

            var theString = "";

            for (let i = 0; i < this.wordArr.length; i++) {
                theString += this.wordArr[i].fill();
            }

            return theString;


        }
        this.guesser = function (char) {

            for (let i = 0; i < this.wordArr.length; i++) {
                this.wordArr[i].check(char);
            }
        }
    }
}

module.exports = Word;
