
var scorePC = 0;
var scoreUser = 0;
var scoreTie = 0;
var elementWordPanel = document.getElementById("wordPanel");
var elementStatus = document.getElementById("status");
let theWord = 'dog';
let usedChars = 'd';
let solved = false;

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

document.onkeyup = function(event) {
    var userKey = event.key;  
    userKey = userKey.toLowerCase();
    usedChars = usedChars + userKey;
    updateWordPanel();    
}


function mainFunction() {
    var x = document.getElementById("fname");
    x.value = x.value.toLowerCase();
    var userKey = x.value;  
    userKey = userKey.toLowerCase();
    usedChars = usedChars + userKey;
    updateWordPanel();
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

    
    
    
    
    
    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var computerChoices = ["r", "p", "s"];
    // Whenever a key is pressed, alert "pressed a button".
    document.onkeyup = function(event) {
    
     // firstprompt.textContent = "";
    
      // Deteremine what key is pressed
      var userKey = event.key;  
      userKey = userKey.toLowerCase();
      // is the key valid?  
      if (computerChoices.indexOf(userKey) > -1)  {
          console.log('user entry ('+userKey+') is valid.');
    
    
    
        // Randomly choose a computer answer (R,P, or S)
        pcKey = computerChoices[Math.floor(Math.random() * computerChoices.length)];    
        // Report!
        if (pcKey === userKey) {
            console.log('user entry ('+userKey+') is equal to pc choice ('+pcKey+'). This is a TIE');
            scoreTie++;
        } else {
            console.log('user entry ('+userKey+') is NOT equal to pc choice ('+pcKey+').');
            if (userKey === 'r') {
                if (pcKey === 'p') { 
                    console.log('pc win');
                    scorePC++;
                } else {
                    console.log('you win');
                    scoreUser++;
                }
            }
    
            if (userKey === 'p') {
                if (pcKey === 's') { 
                    console.log('pc win');
                    scorePC++;
                } else {
                    console.log('you win');
                    scoreUser++;
                }
            }
    
            if (userKey === 's') {
                if (pcKey === 'r') { 
                    console.log('pc win');
                    scorePC++;
                } else {
                    scoreUser++;
                    console.log('you win');
                }
            }
        }    
        // update report
        elementPC.textContent = scorePC;
        elementUser.textContent = scoreUser;
        elementTie.textContent = scoreTie;
    
    } else {
         console.log('user entry ('+userKey+') is NOT valid.');
      }
    };
    