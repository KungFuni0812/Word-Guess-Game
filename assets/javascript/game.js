
var randomWord = [ "mario", "donkeykong", "link", "samus", "yoshi", "kirby", "fox", "pikachu"];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var remainingGuessCount = 6;

var winCount = 0;

var lossCount = 0;

var wrongLetterGuesses = [];

var wordSelected = randomWord[Math.floor(Math.random()*randomWord.length)];

var randomWordIndex = randomWord.indexOf(wordSelected);

var wordDisplay = wordSelected.length;

var underlineDisplay = [];

for (var i = 0; i < wordDisplay; i++) {
    underlineDisplay.push("_")
};

var separator = underlineDisplay.join(" ");

var lettersGuessed = document.getElementById("randomLetters");

lettersGuessed.textContent = separator;

var wrongLettersGuessDisplay = document.getElementById("incorrectGuess");

var remainingGuessCountDisplay = document.getElementById("remainingGuess");

function reSetGame() {
    remainingGuessCount = 6;
    wrongLetterGuesses = [];
    wordSelected = randomWord[Math.floor(Math.random()*randomWord.length)];
    randomWordIndex = randomWord.indexOf(wordSelected);
    wordDisplay = wordSelected.length;
    underlineDisplay = [];
    for (var i = 0; i < wordDisplay; i++) {
        underlineDisplay.push("_")
    };
    separator = underlineDisplay.join(" ");
    lettersGuessed.textContent = separator;
    wrongLettersGuessDisplay.textContent = "";
    remainingGuessCountDisplay.textContent = remainingGuessCount;
}

document.onkeyup = function(event) {
    
    if((remainingGuessCount > 0) && (alphabet.includes(event.key)) ) {

        var keyPressed = event.key
    
        if(wordSelected.includes(keyPressed)) {
    
            var indexs = [];
            
            for ( var j = 0; j < wordDisplay; j++) {
                if (wordSelected[j] === keyPressed ) {
                    indexs.push(j)
                }
            }
    
            for (var k =0; k < indexs.length; k++) {
                var updatedIndex = indexs[k];
                underlineDisplay[updatedIndex] = keyPressed;
            }
    
            var updatedSeparator = underlineDisplay.join(" ");
    
            lettersGuessed.textContent = updatedSeparator;
            
            if (!underlineDisplay.includes("_")) {
                // increase win counter
                winCount++;
                // update HTML page with new win count
                var winCountDisplay = document.getElementById("wins");
                winCountDisplay.textContent = winCount;
                // update HTML page's lastAnswerName element with the name of the character
                var lastAnswerNameDisplay = document.getElementById("lastAnswerName");
                lastAnswerNameDisplay.textContent = randomWord[randomWordIndex];
                // update HTML page's lastAnswerImage img element with the picture of the character
                var lastAnswerPictureDisplay = document.getElementById("lastAnswerPicture");
                lastAnswerPictureDisplay.setAttribute("src", "./assets/images/"+randomWordIndex+".png");
                // play character specific victory music
                var winMusic = new Audio("./assets/music/"+randomWordIndex+".mp3");
                winMusic.play();
                reSetGame();
            }
            
        } else {
    
            if (wrongLetterGuesses.indexOf(keyPressed) === -1) {
                
                wrongLetterGuesses.push(keyPressed);
    
                wrongLettersGuessDisplay.textContent = wrongLetterGuesses;
            
                remainingGuessCount--;
    
                remainingGuessCountDisplay.textContent = remainingGuessCount;    
                
                    if (remainingGuessCount === 0) {
                        // increase loss counter
                        lossCount++;
                        // update HTML page with new loss count
                        var lossCountDisplay = document.getElementById("losses");
                        lossCountDisplay.textContent = lossCount;
                        // update HTML page's lastAnswerName element with the name of the character
                        var lastAnswerNameDisplay = document.getElementById("lastAnswerName");
                        lastAnswerNameDisplay.textContent = randomWord[randomWordIndex];
                        // update HTML page's lastAnswerImage img element with the picture of the character
                        var lastAnswerPictureDisplay = document.getElementById("lastAnswerPicture");
                        lastAnswerPictureDisplay.setAttribute("src", "./assets/images/"+randomWordIndex+".png");
                        // play failure music
                        var loseMusic = new Audio("./assets/music/fail.mp3");
                        loseMusic.play();
                        reSetGame();
                    
                    }
                // reset the game
            }
        }
    }




    




}