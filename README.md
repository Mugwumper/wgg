# Word Guess Game

## gameplay
To play press any key, it will start the engines (background sounds). Once a game is complete advance to the next word by pressing "NEXT". 

Wins and Losses are tallied in the 'computer readout' (small text above the buttons).

MUTE will turn off the engines (background sounds).
RESET will restart the game setting wins and losses back to 0. 

Lastly there is a status message displayed in the upper part of the screen. (press reset to verify).

## Media Queries
The game must be played on a fairly large screen. The main title will be removed as the screen width is made smaller but the size is held to 1125px as the styling becomes distored below this value.

## Credits: 
Theming this game was done by careful using work from other people. I changed items as needed for the game and made sure that was was used has been reviewed such that I at least understand how it was constructed.

### Visuals

#### LCARS (StarTrek) CSS
BY Tom Hazledine 
as seen here: https://codepen.io/tomhazledine/pen/MELGrp

I copied this CSS and changed it by removing the animations and various text elements. I aslo modified it for use as a word game. 

#### Sounds
All sounds are from https://www.trekcore.com/audio/

#### Game Engine
The mechanics of this game are 100% my own.

## bugs
* If you keep typing letters after a loss you will see losses increment. 
UPDATE: I had to fix the above bug when similar error occured when you win. This being less cute I killed both problems.