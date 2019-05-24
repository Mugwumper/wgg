var WINS = 0;
var LOSSES = 0;
const MAX_ATTEMPTS = 10;
var attemptsRemaining = MAX_ATTEMPTS;
var elementWordPanel = document.getElementById("wordPanel");
var elementUsedLetterPanel = document.getElementById("usedLetterPanel");
var elementStatus = document.getElementById("status");
var elementAttempsRemaining = document.getElementById("attemptsRemaining");
var elementSBMPanel = document.getElementById("sbmPanel");

var elementWINS = document.getElementById("WINS");
var elementLOSSES = document.getElementById("LOSSES");

var audioBeep = document.getElementById("AudioBeep"); 
var audioBackground = document.getElementById("AudioBackground"); 
var audioAlert = document.getElementById("AudioAlert"); 
var audioOK = document.getElementById("AudioOK");
var audioBadBeep = document.getElementById("AudioBadBeep");
var audioComputerWorkBeep = document.getElementById("AudioComputerWorkBeep"); 

let theWord = 'hammer';
let usedChars = '';
let solved = false;
let firstKeypressed = false;
var gTimeoutVar;
var isActiveGame = true;

console.log("script started");
doNextWord();

function updateWordPanel() {
    let displayStr = "";    
    for (var x = 0; x < theWord.length; x++) {
        var c = theWord.charAt(x);
        if (usedChars.includes(c)) {
            displayStr = displayStr + c + " ";
        } else {
            displayStr = displayStr + "_ ";
        }
    }
    elementWordPanel.textContent = displayStr;
    solved = isSolved(displayStr);
    updateGUI();
}

function updateUsedLetterPanel(Chars) {
    var displayStr = '';
    for (var x = 0; x < Chars.length; x++) {
        var c = Chars.charAt(x);
        displayStr = displayStr + c + ", ";
    }
    elementUsedLetterPanel.textContent = "Used Letters: " + displayStr;
}

document.onkeyup = function(event) {
    var userKey = event.key;  
    userKey = userKey.toLowerCase();
    applyChar(userKey);
    if (!firstKeypressed) {
        firstKeypressed = true;
        audioBackground.play();
    }
}

function mainFunction() { // dead
    var x = document.getElementById("input");
    var c =  x.value.charAt(x.value.length-1);
    // x.value = x.value.toLowerCase();
    // applyChar(x.value);
    c = c.toLowerCase();
    applyChar(c);
}

function applyChar(char) {
    audioBeep.play();
    char = char.toLowerCase();
    console.log("User entered: '"+char+"'");
    if (isActiveGame) {
        // check if the character has been used already.
        if (isCharInWord(char, usedChars)) {
            sbm("You already used '"+char+"'");
        } else {
            // check if the character is in the word.
            if (isCharInWord(char, theWord)) {
                // TODO: Update some kinda - good for you, that character is in the word!
            } else {
                attemptsRemaining--;  
                audioBadBeep.play();
            }
            updateAttemptsRemaining(attemptsRemaining);
            usedChars = usedChars + char;
        }
        updateWordPanel();
        updateUsedLetterPanel(usedChars);
    }
}

function isSolved(displayStr) {
    return (!(displayStr.includes('_')));
}
   
function updateGUI() {
    updateStatus();
    updateScore();
}

function updateScore() {
    var w = pad(WINS, 4);
    var l = pad(LOSSES, 4);
    function pad(num, size) {
        var s = "000000000" + num;
        return s.substr(s.length-size);
    }
    elementWINS.textContent = w;
    elementLOSSES.textContent = l;
}

function updateStatus() {
    if (solved) {
        audioAlert.pause(); 
        audioOK.play();
        elementStatus.textContent = "Puzzle Solved";
        ifActiveWIN();
    } else {
        elementStatus.textContent = "Puzzle Unsolved - Keep trying";
    }
} 

function ifActiveWIN() {
    if (isActiveGame) {
        WINS++;
        isActiveGame = false;
    }
}

function ifActiveLOSE() {
    if (isActiveGame) {
        LOSSES++;
        isActiveGame = false;
    }
}

function updateAttemptsRemaining(attemptsRemaining) {
    if (attemptsRemaining > 0) { 
        if (attemptsRemaining < 4) {
            audioAlert.play(); 
        } else {
            audioAlert.pause(); 
        }
        elementAttempsRemaining.textContent = "Attempts Remaining: " + attemptsRemaining;
    } else {
        audioAlert.pause(); 
        elementAttempsRemaining.textContent = "Attempts Remaining: 0 (you lose)";
        ifActiveLOSE();
    }
}

function doNextWord() {
    audioAlert.pause();
    audioComputerWorkBeep.play(); 
    theWord = getNextWord(); 
    usedChars = '';
    solved = false;
    updateWordPanel();
    updateGUI();
    updateUsedLetterPanel(usedChars);
    elementStatus.textContent = "Puzzle Unsolved";
    attemptsRemaining = MAX_ATTEMPTS;  
    updateAttemptsRemaining(attemptsRemaining);
    //document.getElementById("input").value = '';
    isActiveGame = true;
    sbm("New Game");
}

function doReset() {
    WINS = 0;
    LOSSES = 0;
    sbm("Game Reset");
    doNextWord();
    audioAlert.pause(); 
}    


function sbm(msg) {
    clearTimeout(gTimeoutVar);
    gTimeoutVar= elementSBMPanel.textContent = msg;
    setTimeout(clearSBM, 1000);
}    

function clearSBM() {
    elementSBMPanel.textContent = '';
}

function doTest() {
    applyChar('o');
    //sleep(500);
    applyChar('g');
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}
    
  
function backgroundSoundStart() {
    audioBackground.play();
}
function backgroundSoundStop() {
    audioBackground.pause();
}
function beep() {
    audioBeep.play();
}

function alert() {
    audioComputerWorkBeep.play();
}

/// utility functions
function isCharInWord(char, Word) {
    isFound = false;
    for (var x = 0; x < Word.length; x++) {
        var c = Word.charAt(x);
        if (char === c) {
            /// this char is a hit!
            isFound = true;    
        }
    }
    return isFound;
}
