let currMoleTile;
let currBadMoleTile;
let score = 0;
let gameOver = false;
let pause = false;
let pauseButton = document.getElementById("pauseButton");
let retryButton = document.getElementById("retryButton");
let board = document.getElementById("board");
let startbutton = document.getElementById("StartGame");



startbutton.addEventListener("click", toggleClickable);
    function toggleClickable() {
                pause =false;
                gameOver=false;
                startbutton.style.display = 'none';
                 setGame();
            
        }
// pause and restart game buttons along with functions:
pauseButton.addEventListener("click", pauseGame);
retryButton.addEventListener("click", restartGame);

//pause game button function
function pauseGame() { 
    console.log("pauseGame");
    
    if (pause) {
        pause =false;
        pauseButton.innerText = "Pause";
    } else {
        pause = true;
        pauseButton.innerText = "Resume";
    }
}

//restart game button function
function restartGame() {
    console.log("restartgame");
    score = 0;
    gameOver = false;
    pause =false;
    document.getElementById("score").innerText = "Score : "+ score.toString();
    pauseButton.innerText = "Pause";
}


function setGame() {
    //set up the grid in html(pipes)
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }
    startGame();
   
}
function startGame(){
     if (gameOver || pause) {
        return;
    }
     setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
    setInterval(setBadMole, 1000); // 1000 miliseconds = 1 seconds, every 1 second call setBadMole

}
function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver || pause ) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "../images/goodmole.png";

    let num = getRandomTile();
    if (currBadMoleTile && currBadMoleTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setBadMole() {
    if (gameOver || pause) {
        return;
    }
    if (currBadMoleTile) {
        currBadMoleTile.innerHTML = "";
    }
    let BadMole = document.createElement("img");
    BadMole.src = "../images/badmole.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currBadMoleTile = document.getElementById(num);
    currBadMoleTile.appendChild(BadMole);
}

function selectTile() {
    if (gameOver || pause) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score : "+score.toString(); //update score html
    }
    else if (this == currBadMoleTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    }
}
