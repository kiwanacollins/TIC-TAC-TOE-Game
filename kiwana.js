let grid = document.getElementsByClassName('baby');
let resetButton = document.getElementById('reset');
let playerXScore = document.getElementById('player-x');
let playerOScore = document.getElementById('player-y');
let winner = document.getElementById('winner');
let bool = true;

resetButton.addEventListener('click', () => {
    for (let i = 0; i < grid.length; i++) {
        grid[i].textContent = '';
        winner.textContent = '';
        grid[i].style.color = 'black';
        playerOScore.textContent = 0;
        playerXScore.textContent = 0;
    }
    bool = true;
});

function addInput(i) {
    if (grid[i].textContent !== '') {
        return;
    }

    if (bool) {
        grid[i].style.color = 'white';
        grid[i].textContent = 'X';
    } else {
        grid[i].style.color = 'black';
        grid[i].textContent = 'O';
    }

    bool = !bool;
}

let gridValue = [];
function storeGridValueAfterClick() {
    gridValue = [];
    for (let i = 0; i < grid.length; i++) {
        gridValue.push(grid[i].textContent);
    }
    checkForWinner(); 
}

for (let i = 0; i < grid.length; i++) {
    grid[i].addEventListener('click', () => {  
        addInput(i);
        storeGridValueAfterClick();
    });
}
function checkForWinner() {

    let winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombos) {
        if (gridValue[combo[0]] !== '' && gridValue[combo[0]] === gridValue[combo[1]] && gridValue[combo[1]] === gridValue[combo[2]]) {
            grid[combo[0]].style.color = 'green';
            grid[combo[1]].style.color = 'green';
            grid[combo[2]].style.color = 'green';
            if (gridValue[combo[0]] === 'X') {
                document.getElementById('fireworks-x').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('fireworks-x').style.display = 'none';
                }, 1000);

                playerXScore.textContent = parseInt(playerXScore.textContent) + 1;
                speak('Player X wins');
                winner.textContent = 'Player X wins';
            } else {
                document.getElementById('fireworks-y').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('fireworks-y').style.display = 'none';
                }, 1000);
                playerOScore.textContent = parseInt(playerOScore.textContent) + 1;
                winner.textContent = 'Player O wins';
                speak('Player O wins');
            }
            clearAllGrids();
            return;
        }
    }

    
    if (gridValue[0] === gridValue[1] && gridValue[1] === gridValue[2] && gridValue[0] !== '') {
        grid[0].style.color = 'green';
        grid[1].style.color = 'green';
        grid[2].style.color = 'green';
        clearAllGrids();
    }
    if (gridValue[3] === gridValue[4] && gridValue[4] === gridValue[5] && gridValue[3] !== '') {
        grid[3].style.color = 'green';
        grid[4].style.color = 'green';
        grid[5].style.color = 'green';
        clearAllGrids();
    }
    if (gridValue[6] === gridValue[7] && gridValue[7] === gridValue[8] && gridValue[6] !== '') {
        grid[6].style.color = 'green';
        grid[7].style.color = 'green';
        grid[8].style.color = 'green';
        clearAllGrids();
    }
    if (gridValue[0] === gridValue[3] && gridValue[3] === gridValue[6] && gridValue[0] !== '') {
        grid[0].style.color = 'green';
        grid[3].style.color = 'green';
        grid[6].style.color = 'green';
        clearAllGrids();
    }
    if (gridValue[1] === gridValue[4] && gridValue[4] === gridValue[7] && gridValue[1] !== '') {
        grid[1].style.color = 'green';
        grid[4].style.color = 'green';
        grid[7].style.color = 'green';
        clearAllGrids();
    }
    if (gridValue[2] === gridValue[5] && gridValue[5] === gridValue[8] && gridValue[2] !== '') {
        grid[2].style.color = 'green';
        grid[5].style.color = 'green';
        grid[8].style.color = 'green';
        clearAllGrids();
    }
    if (gridValue[0] === gridValue[4] && gridValue[4] === gridValue[8] && gridValue[0] !== '') {
        grid[0].style.color = 'green';
        grid[4].style.color = 'green';
        grid[8].style.color = 'green';
        clearAllGrids();
    }
    if (gridValue[2] === gridValue[4] && gridValue[4] === gridValue[6] && gridValue[2] !== '') {
        grid[2].style.color = 'green';
        grid[4].style.color = 'green';
        grid[6].style.color = 'green';
        clearAllGrids();
    }
    if (gridValue[0] !== '' && gridValue[1] !== '' && gridValue[2] !== '' && gridValue[3] !== '' && gridValue[4] !== '' && gridValue[5] !== '' && gridValue[6] !== '' && gridValue[7] !== '' && gridValue[8] !== '') {
        for (let i = 0; i < grid.length; i++) {
            grid[i].style.color = 'blue';
        }
        speak('its a draw');
        clearAllGrids();
        winner.textContent = `IT'S A DRAW`;
    }
    
    if (checkWin('X')) {
        
        playerXScore.textContent = parseInt(playerXScore.textContent) + 1;
        winner.textContent = 'Player X wins';
        for (let i = 0; i < grid.length; i++) {
            grid[i].style.color = 'green';

        }
        clearAllGrids();
        return;
    }
    else if (checkWin('O')) {
        
        playerOScore.textContent = parseInt(playerOScore.textContent) + 1;
        winner.textContent = 'Player O wins';
        speak('Player O wins');
        for (let i = 0; i < grid.length; i++) {
            grid[i].style.color = 'green';
        }
        clearAllGrids();
        return;
    }

    function speak(text) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }
    


    function clearAllGrids() {
        //refresh the page after 1.5 seconds
        setTimeout(() => {
            for (let i = 0; i < grid.length; i++) {
                grid[i].textContent = '';
                grid[i].style.color = 'black';
            }
            bool = true;
        }, 600);
    }
}


function checkWin(player) {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
        if (gridValue[i] === player && gridValue[i + 1] === player && gridValue[i + 2] === player) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (gridValue[i] === player && gridValue[i + 3] === player && gridValue[i + 6] === player) {
            return true;
        }
    }

    // Check diagonals
    if (gridValue[0] === player && gridValue[4] === player && gridValue[8] === player) {
        return true;
    }
    if (gridValue[2] === player && gridValue[4] === player && gridValue[6] === player) {
        return true;
    }

    return false;
}
