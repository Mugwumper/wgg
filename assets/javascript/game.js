
var scoreUser = 0;
const MAX_ATTEMPTS = 10;
var attemptsRemaining = MAX_ATTEMPTS;
var elementWordPanel = document.getElementById("wordPanel");
var elementUsedLetterPanel = document.getElementById("usedLetterPanel");
var elementStatus = document.getElementById("status");
var elementAttempsRemaining = document.getElementById("attemptsRemaining");
var elementSBMPanel = document.getElementById("sbmPanel");
let theWord = 'hammer';
let usedChars = '';
let solved = false;
var gTimeoutVar;

console.log("script started");
updateWordPanel();

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
    updateStatus();
}

function updateUsedLetterPanel(Chars) {
    var displayStr = '';
    for (var x = 0; x < Chars.length; x++) {
        var c = Chars.charAt(x);
        displayStr = displayStr + c + ", ";
    }
    elementUsedLetterPanel.textContent = displayStr;
}

// document.onkeyup = function(event) {
//     var userKey = event.key;  
//     userKey = userKey.toLowerCase();
//     usedChars = usedChars + userKey;
//     updateWordPanel();    
// }

function mainFunction() {
    var x = document.getElementById("input");
    var c =  x.value.charAt(x.value.length-1);
    // x.value = x.value.toLowerCase();
    // applyChar(x.value);
    c = c.toLowerCase();
    applyChar(c);
}

function applyChar(char) {
    char = char.toLowerCase();
    console.log("User entered: '"+char+"'");
    // check if the character has been used already.
    if (isCharInWord(char, usedChars)) {
        sbm("You already used '"+char+"'");
    } else {
        // check if the character is in the word.
        if (isCharInWord(char, theWord)) {
            // TODO: Update some kinda - good for you, that character is in the word!
        } else {
            attemptsRemaining--;  
        }
        updateAttemptsRemaining(attemptsRemaining);
        usedChars = usedChars + char;
    }
    updateWordPanel();
    updateUsedLetterPanel(usedChars);
}

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

function isSolved(displayStr) {
    return (!(displayStr.includes('_')));
}
    
function updateStatus() {
    if (solved) {
        elementStatus.textContent = "Puzzle Solved";
    } else {
        elementStatus.textContent = "Puzzle Unsolved - Keep trying";
    }
} 

function updateAttemptsRemaining(attemptsRemaining) {
    if (attemptsRemaining > 0) { 
        elementAttempsRemaining.textContent = "Attempts Remaining: " + attemptsRemaining;
    } else {
        elementAttempsRemaining.textContent = "Attempts Remaining: 0 (you lose)";
    }
}

function doReset() {
    theWord = 'cat';
    scoreUser = 0;
    attemptsRemaining = MAX_ATTEMPTS;  
    updateAttemptsRemaining(attemptsRemaining);
     usedChars = '';
    solved = false;
    updateWordPanel();
    updateStatus();
    updateUsedLetterPanel(usedChars);
    updateUsedLetterPanel
    elementStatus.textContent = "Puzzle Unsolved";
    document.getElementById("input").value = '';
    sbm("game reset");
}    
    
function sbm(msg) {
    clearTimeout(gTimeoutVar);
    gTimeoutVar= elementSBMPanel.textContent = msg;
    setTimeout(clearSBM, 1000);
}    

function clearSBM() {
    elementSBMPanel.textContent = '.';
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
    
    