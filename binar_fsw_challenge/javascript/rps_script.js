// WORKFLOW: 
// if one button is clicked:
//  -- background changed
//  -- computer randomly run the choice
//  -- decided if it's win/lose/draw
//  -- if other button is clicked --> nothing happened
//  -- if refresh button is clicked --> set all to default 



/// --------------- ///
/// DEFINE VARIABLE ///
/// --------------- ///

// variable for weapons
const playerWeapons = document.querySelectorAll('.player-weapons');
const comWeapons = document.querySelectorAll('.com-weapons');

// variable for result elements
const refreshButton = document.getElementById("refresh");
const vsSign = document.getElementById("versus");
const playerWinSign = document.getElementById("player-win");
const comWinSign = document.getElementById("com-win");
const drawSign = document.getElementById("draw");


// function on variable for style changing
const changeBackground = (element) => {
    element.style.backgroundColor = "#C4C4C4";
    element.style.borderRadius = "20%";
}

const draw = () => {
    drawSign.style.visibility = "visible";
}

const playerWin = () => {
    playerWinSign.style.visibility = "visible";
}

const comWin = () => {
    comWinSign.style.visibility = "visible";
}



/// -------------- ///
/// DEFINE ACTIONS ///
/// -------------- ///

// reset page to default when refresh button is clicked
refreshButton.addEventListener('click', function reset() {
   location.reload();
});


// variable to indicate whether the button is clicked
let buttonClicked = false;


// the game --> run on click
playerWeapons.forEach((weapon) => {
    weapon.addEventListener('click', function onClick() {            
        
        // disregard changes upon any click after the game 
        if (buttonClicked) {
            return;
        }

        // player chooses the weapon
        let playerSelected = weapon;
        changeBackground(playerSelected);

        // computer randomly chooses the weapon
        let randomNum = Math.floor(Math.random() * comWeapons.length);
        let comSelected = comWeapons[randomNum];
        changeBackground(comSelected);

        // remove VS sign
        vsSign.style.visibility = "hidden";


        // condition for result
        if (playerSelected.className.split(' ')[1] === comSelected.className.split(' ')[1]) {
            draw();
        }
        else if (playerSelected.className.split(' ')[1] === "rock") {
            if (comSelected.className.split(' ')[1] === "paper") {
                comWin();
            } else {
                playerWin();
            }
        }
        else if (playerSelected.className.split(' ')[1] === "paper") {
            if (comSelected.className.split(' ')[1] === "scissors") {
                comWin();
            } else {
                playerWin();
            }
        }
        else {
            if (comSelected.className.split(' ')[1] === "rock") {
                comWin();
            } else {
                playerWin();
            }
        }

        // indicate that the button has been clicked
        buttonClicked = true;
    })
})
