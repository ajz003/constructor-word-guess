var Word = require("./Word.js");
var inquirer = require("inquirer");

var letterArr = [];
var guessedArr = [];
var guessesLeft = 10;

var arrOfWords = ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"]

var random = arrOfWords[Math.floor((Math.random() * arrOfWords.length) + 1)]

var hangman = new Word(random);
var display;

// ----------------- Functions

function init() {
    hangman.addLetters();
    display = hangman.wordStr();
    console.log(display);

    for (var i = 0; i < hangman.wordArr.length; i++) {
        letterArr.push(hangman.wordArr[i].letter);
    }
    game();

}

function reset() {

    random = arrOfWords[Math.floor((Math.random() * arrOfWords.length) + 1)];
    hangman = new Word(random);
    hangman.addLetters();
    display = hangman.wordStr();
    letterArr = [];
    guessedArr = [];
    guessesLeft = 10;
    for (var i = 0; i < hangman.wordArr.length; i++) {
        letterArr.push(hangman.wordArr[i].letter);
    }

}

function game() {

    if (!display.includes("_")) {
        console.log("--------------------------------")
        console.log("You guessed it! Next word!");
        console.log("--------------------------------")
        reset();
        console.log(display);
        console.log("\r\n" + guessesLeft + " guesses left!!!\r\n");
    }

    inquirer
        .prompt([{
            type: "input",
            message: "Guess a letter!",
            name: "guess"
        }])
        .then(res => {

            let userGuess = res.guess;
            let tester = /^[A-Za-z]+$/;

            if (userGuess.match(tester) && userGuess.length === 1) {

                if (guessedArr.includes(userGuess)) {
                    console.log("\r\nAlready guessed!\r\n");
                }
                if (letterArr.includes(userGuess) && !guessedArr.includes(userGuess)) {
                    console.log("\r\nCorrect!\r\n")
                    letterArr = letterArr.filter(a => a !== userGuess)
                    guessedArr.push(userGuess);
                } else if (!guessedArr.includes(userGuess) && !letterArr.includes(userGuess)) {
                    console.log("\r\nIncorrect!");
                    guessedArr.push(userGuess);
                    guessesLeft--;
                    if (guessesLeft === 0) {
                        console.log("--------------------------------")
                        console.log("The word was " + random + ". Next word!");
                        console.log("--------------------------------")
                        reset();
                        display = hangman.wordStr();
                        console.log(display);
                        console.log("\r\n" + guessesLeft + " guesses left!!!\r\n");
                        game();
                        return;
                    }

                }

                hangman.guesser(userGuess);
            } else if (!userGuess.match(tester) || userGuess.length !== 1) {
                console.log("\r\nInvalid input.\r\n")
            }
            display = hangman.wordStr();
            console.log(display);
            console.log("\r\n" + guessesLeft + " guesses left!!!\r\n");

            game();

        })

}

// ------------- Initialize

init();