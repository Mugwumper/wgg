let words = [
    "discovery", 
    "star",
    "trek",
    "voyager",
    "enterprise",
    "shuttle",
    "kelvin",
    "photon",
    "academy",
    "spatial",
    "starship",
    "klingon",
    "borg",
    "deep",
    "space",
    "phase",
    "torpedo",
    "array",
    "warp",
    "starfleet",
    "spock",
    "generation"
];


function getNextWord() {
		const max = words.length;
		const rand = Math.floor(max * Math.random());
		return words[rand].toLowerCase();
}


