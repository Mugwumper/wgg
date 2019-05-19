

var scoreUser = 0;
const MAX_ATTEMPTS = 10;
var attemptsRemaining = MAX_ATTEMPTS;
var elementWordPanel = document.getElementById("wordPanel");
var elementUsedLetterPanel = document.getElementById("usedLetterPanel");
var elementStatus = document.getElementById("status");
var elementSBMPanel = document.getElementById("sbmPanel");
let theWord = 'dog';
let usedChars = 'd';
let solved = false;
var gTimeoutVar;

console.log("script started");

function updateWordPanel() {
    let wordString = theWord;
    let displayStr = "";
    
    for (var x = 0; x < wordString.length; x++) {
        var c = wordString.charAt(x);
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

updateWordPanel();

function updateUsedLetterPanel(usedChars) {
    var displayStr = '';
    for (var x = 0; x < usedChars.length; x++) {
        var c = usedChars.charAt(x);
            displayStr = displayStr + c + ", ";
    }
    elementUsedLetterPanel.textContent = displayStr;
}

document.onkeyup = function(event) {
    var userKey = event.key;  
    userKey = userKey.toLowerCase();
    usedChars = usedChars + userKey;
    updateWordPanel();    
}

function mainFunction() {
    var x = document.getElementById("input");
    var c =  x.value.charAt(x.value.length-1);
    // x.value = x.value.toLowerCase();
    // applyChar(x.value);
    c = c.toLowerCase();
    applyChar(c);
}

function applyChar(char) {
    var userKey = char;  
    userKey = userKey.toLowerCase();
    usedChars = usedChars + userKey;
    updateWordPanel();
    updateUsedLetterPanel(usedChars);
    sbm("User entered a "+userKey+" ", 100);
}

function isSolved(displayStr) {
    return !(displayStr.includes('_'));
}
    
function updateStatus() {
    if (solved) {
        elementStatus.textContent = "Puzzle Solved";
    } else {
        elementStatus.textContent = "Puzzle Unsolved - Keep trying";
    }
} 

function doReset() {
    theWord = 'cat';
    scoreUser = 0;
    attemptsRemaining = MAX_ATTEMPTS;   
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
    
function sbm(msg,  holdtime) {
    clearTimeout(gTimeoutVar);
    gTimeoutVar= elementSBMPanel.textContent = msg;
    sleep(holdtime);
    setTimeout(clearSBM, 3000);
}    

function clearSBM() {
    elementSBMPanel.textContent = '.';
}

function doTest() {
    applyChar('o');
    sleep(500);
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
    
    