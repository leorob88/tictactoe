<script setup>

import { provide, onMounted, onRenderTriggered } from "vue";
import Cell from "../components/Cell.vue";
import Line from "../components/Line.vue";
import { settings } from "../assets/js/Settings.js";

provide("line", lineUpdate);

// victory ilne element needs fixes to avoid unintended positioning on window resize
onMounted(() => {
    window.addEventListener('resize', lineUpdate);
})


// draw a line striking through the winning cells
function lineUpdate() {
    if (settings.game.tris) {
        // winning cell is usually top left, but one combination has it in bottom left, so the svg still needs to be top left
        let index = settings.game.winningTriad.index;
        if (index == -1 || index == 7) {
            settings.game.svg_line.winningPosition = "upleft";
        } else {
            settings.game.svg_line.winningPosition = settings.game.winningTriad.cells[0];
        }
        let cell = document.getElementById(settings.game.svg_line.winningPosition);
        let div = document.getElementById("centermiddle");
        let width = div.getBoundingClientRect().width, height = div.getBoundingClientRect().height;
        if (index < 3 || index > 5) { width *= 3; }
        if (index > 2) { height *= 3; }
        // setting svg position and size
        settings.game.svg_line.left = cell.getBoundingClientRect().left;
        settings.game.svg_line.top = cell.getBoundingClientRect().top;
        settings.game.svg_line.width = width;
        settings.game.svg_line.height = height;
        // getting coordinates for the line strike
        let diff = 0;
        if (index > 2) {
            diff = settings.game.svg_line.height / 12;
        } else {
            diff = settings.game.svg_line.width / 12;
        }
        let x1 = settings.game.svg_line.width / 2;
        if (index < 3 || index > 5) { x1 = x1 / 3 - diff; }
        let y1 = settings.game.svg_line.height;
        if (index == 7) {
            y1 = y1 / 6 * 5 + diff;
        } else if (index < 7 && index > 2) {
            y1 = y1 / 6 - diff;
        } else {
            y1 /= 2;
        }
        let x2 = settings.game.svg_line.width;
        if (index < 3 || index > 5) {
            x2 = x2 / 6 * 5 + diff;
        } else {
            x2 /= 2;
        }
        let y2 = settings.game.svg_line.height;
        if (index == 7) {
            y2 = y2 / 6 - diff;
        } else if (index < 7 && index > 2) {
            y2 = y2 / 6 * 5 + diff;
        } else {
            y2 /= 2;
        }
        settings.game.svg_line.x1 = x1;
        settings.game.svg_line.y1 = y1;
        settings.game.svg_line.x2 = x2;
        settings.game.svg_line.y2 = y2;
    }
}

// game starts and cpu has first move
if (settings.game.vsCpu && settings.game.currentPlayer == 2 && settings.game.playing) {
    randomMove()
}

//              a.i. turn logic:
//
//           (0) check if cpu already moved
//           |                            |
//           |                            |
//          no                            yes
//           |                            |
//           |                            |
// random move                            (1) check if cpu can win
//           |                            |                      |
//           |                            |                      |
//           |                          yes                      no
//           |                            |                      |
//           |                            |                      |
//           |                     (2) wins                      (3) check if the player is winning
//           |                                                   |                                |
//           |                                                   |                                |
//           |                                                 yes                               no
//           |                                                   |                                |
//           |                                                   |                                |
//           |                                      (4) stops them                                (5) check if there is a helpful move
//           |                                                   |                                |                                  |
//           |                                                   |                                |                                  |
//           |                                                   |                              yes                                  no
//           |                                                   |                                |                                  |
//           |                                                   |                                |                                  |
//           |                                                   |            (6) does helpful move                                  (7) random move
//           |                                                   |                                |                                  |
//           |___________________________________________________|________________________________|__________________________________|
//                                                                                 |
//                                                                                 |
//                                                                           check if draw

function virtualPlayerMove() {
    // (0) check if cpu already moved
    let aiMoves = Object.keys(settings.game.movesDone).filter(move => settings.game.movesDone[move] === "O");
    if (aiMoves.length > 0) {
        // yes, it moved
        // (1) check if cpu can win
        let almostWon = [];
        for (let index = 0; index < settings.winningCombinations.length; index++) {
            let pairMoves = [];
            let noOCell = "";
            let currentTriad = settings.winningCombinations[index];
            let allMoves = settings.game.movesDone;
            if (allMoves[currentTriad[0]] == "O") { pairMoves.push(currentTriad[0]); } else { noOCell = currentTriad[0]; }
            if (allMoves[currentTriad[1]] == "O") { pairMoves.push(currentTriad[1]); } else { noOCell = currentTriad[1]; }
            if (allMoves[currentTriad[2]] == "O") { pairMoves.push(currentTriad[2]); } else { noOCell = currentTriad[2]; }
            if (pairMoves.length == 2 && allMoves[noOCell] == "") { almostWon.push({ currentTriad, pairMoves, noOCell, index }) }
        }
        if (almostWon.length > 0) {
            // yes, cpu can win
            // (2) wins
            let winningTriad = almostWon[Math.floor(Math.random() * almostWon.length)];
            settings.game.movesDone[winningTriad["noOCell"]] = "O";
            settings.game.winner = settings.data.player2;
            settings.game.winnerId = 2;
            settings.game.player2Score++;
            settings.game.winnerScore = settings.game.player2Score;
            settings.game.tris = true;
            settings.game.winningTriad.index = winningTriad["index"];
            settings.game.winningTriad.cells = winningTriad["currentTriad"];
            settings.game.playing = false;
            lineUpdate();
        } else {
            // no, cpu can't win
            // (3) check if the player is winning
            let playerAlmostWon = [];
            for (let index = 0; index < settings.winningCombinations.length; index++) {
                let pairMoves = [];
                let noXCell = "";
                let currentTriad = settings.winningCombinations[index];
                let allMoves = settings.game.movesDone;
                if (allMoves[currentTriad[0]] == "X") { pairMoves.push(currentTriad[0]); } else { noXCell = currentTriad[0]; }
                if (allMoves[currentTriad[1]] == "X") { pairMoves.push(currentTriad[1]); } else { noXCell = currentTriad[1]; }
                if (allMoves[currentTriad[2]] == "X") { pairMoves.push(currentTriad[2]); } else { noXCell = currentTriad[2]; }
                if (pairMoves.length == 2 && allMoves[noXCell] == "") { playerAlmostWon.push({ currentTriad, pairMoves, noXCell, index }) }
            }
            if (playerAlmostWon.length > 0) {
                // yes, they're winning
                // (4) stops them
                let winningTriad = playerAlmostWon[Math.floor(Math.random() * playerAlmostWon.length)];
                settings.game.movesDone[winningTriad["noXCell"]] = "O";
                checkDraw();
                if (settings.game.playing) {
                    virtualToPlayer();
                }
            } else {
                // no, they're not winning
                // (5) check if there is a helpful move
                let triadsForWin = [];
                for (let i = 0; i < aiMoves.length; i++) {
                    for (let a = 0; a < settings.winningCombinations.length; a++) {
                        let checkTriad = settings.winningCombinations[a];
                        if (checkTriad.includes(aiMoves[i])) {
                            checkTriad = checkTriad.filter(checkCell => checkCell != aiMoves[i]);
                            if (settings.game.movesDone[checkTriad[0]] == "" && settings.game.movesDone[checkTriad[1]] == "") {
                                triadsForWin.push(checkTriad);
                            }
                        }
                    }
                }
                if (triadsForWin.length > 0) {
                    // yes, there is
                    // (6) does helpful move
                    let randomTriad = triadsForWin[Math.floor(Math.random() * triadsForWin.length)];
                    let randomCell = randomTriad[Math.floor(Math.random() * 2)];
                    settings.game.movesDone[randomCell] = "O";
                    checkDraw();
                    if (settings.game.playing) {
                        virtualToPlayer();
                    }
                } else {
                    // no, there isn't
                    // (7) random move
                    randomMove();
                }
            }
        }
    } else {
        // no, it didn't move
        randomMove();
    }
}

function checkDraw() {
    let totalMoves = 0;
    for (let cell in settings.game.movesDone) {
        if (settings.game.movesDone[cell] != "") { totalMoves++; }
    }
    if (totalMoves == 9) {
        settings.game.playing = false;
        settings.game.draw = true;
    }
}

// random move for a.i.
function randomMove() {
    let freeCells = [];
    for (let move in settings.game.movesDone) {
        if (settings.game.movesDone[move] == "") { freeCells.push(move); }
    }
    let randomMove = Math.floor(Math.random() * freeCells.length);
    settings.game.movesDone[freeCells[randomMove]] = "O";
    checkDraw();
    if (settings.game.playing) {
        virtualToPlayer();
    }
}

// after a.i. move it's player1 turn
function virtualToPlayer() {
    settings.game.currentPlayer = 1;
    settings.game.remainingTime = 20;
}

// resets board and game data
function eraseBoard() {
    settings.game.hoveredCell = "";
    for (let option in settings.game.svg_line) {
        settings.game.svg_line[option] = 0;
    }
    settings.game.svg_line.winningPosition = "upleft";
    for (let option in settings.game.movesDone) {
        settings.game.movesDone[option] = "";
    }
    settings.game.remainingTime = 20;
    let randomPlayer = Math.floor(Math.random() * 2) + 1;
    settings.game.currentPlayer = randomPlayer;
    settings.game.timeUp = false;
    settings.game.tris = false;
    settings.game.draw = false;
    settings.game.playing = true;
    settings.game.winner = "";
    settings.game.winnerId = 0;
    settings.game.winningTriad.index = -1;
    settings.game.winningTriad.cells = ["", "", ""];
    if (settings.game.currentPlayer == 2 && settings.game.vsCpu) {
        randomMove();
    }
}

function openSettings() {
    settings.tempData.player1 = settings.data.player1;
    settings.tempData.player2 = settings.data.player2;
    settings.tempData.theme = settings.data.theme;
    settings.tempData.timer = settings.data.timer;
    settings.visibility.settingsVisible = true;
    settings.visibility.gameVisible = false;
    settings.game.paused = true;
}

</script>

<template>
    <div id="game" class="dn-padded">
        <Line />
        <div id="board-container" class="centered">
            <div></div>
            <div id="board" :class="settings.themes[settings.data.theme]">
                <div class="row">
                    <Cell classes="up-cell left-cell" position="upleft" @cpu="virtualPlayerMove()" />
                    <Cell classes="up-cell" position="upmiddle" @cpu="virtualPlayerMove()" />
                    <Cell classes="up-cell right-cell" position="upright" @cpu="virtualPlayerMove()" />
                </div>
                <div class="row">
                    <Cell classes="left-cell" position="leftmiddle" @cpu="virtualPlayerMove()" />
                    <Cell classes="" position="centermiddle" @cpu="virtualPlayerMove()" />
                    <Cell classes="right-cell" position="rightmiddle" @cpu="virtualPlayerMove()" />
                </div>
                <div class="row">
                    <Cell classes="down-cell left-cell" position="downleft" @cpu="virtualPlayerMove()" />
                    <Cell classes="down-cell" position="downmiddle" @cpu="virtualPlayerMove()" />
                    <Cell classes="down-cell right-cell" position="downright" @cpu="virtualPlayerMove()" />
                </div>
            </div>
            <div></div>
        </div>
        <div :class="['centered', 'padded', { 'game-over': !settings.game.playing }]">
            <div>
                <p class="message">
                    {{
                        settings.game.tris ? settings.game.winner :
                        settings.game.draw ? 'PLAYERS CAME TO A DRAW!' :
                        settings.game.timeUp ? 'TIME IS UP! ' :
                        'Currently playing: '
                    }}
                </p>
                <p class="message">
                    {{
                        settings.game.tris ? ' WINS THIS GAME!' :
                        settings.game.draw ? '' : 
                        settings.game.timeUp ? settings.game.winner + ' WINS THIS GAME!' :
                        settings.game.currentPlayer == 1 ? settings.data.player1 : settings.data.player2
                    }}
                </p>
            </div>
        </div>
        <div class="centered padded">
            <div id="game-score">
                <div id="player1-score" class="player-score">
                    {{ settings.data.player1 }} score: {{ settings.game.player1Score }}
                </div>
                <div id="player2-score" class="player-score">
                    {{ settings.data.player2 }} score: {{ settings.game.player2Score }}
                </div>
            </div>
        </div>
        <div v-if="settings.data.timer" id="show-time" :class="['padded', 'timer', { 'hidden': !settings.game.playing }]">
            <br />
            <div id="time-title">Time:&nbsp</div>
            <div id="time-remaining">&nbsp{{ settings.game.remainingTime }}s</div>
        </div>
        <div class="centered">
            <button id="btn-erase" :class="settings.themes[settings.data.theme]" @click="eraseBoard()" :disabled="!settings.game.playing">Erase</button>
            <button id="btn-settings" :class="settings.themes[settings.data.theme]" @click="openSettings()">Settings</button>
        </div>
        <div v-show="!settings.game.playing" class="centered">
            <button id="btn-rematch" :class="settings.themes[settings.data.theme]" @click="eraseBoard()">Rematch</button>
        </div>
    </div>
</template>

<style>

#game {
    width: 100%;
}

.centered {
    display: flex;
    justify-content: center;
}

.game-over {
    animation: zoom-in-zoom-out 1.5s ease infinite;
}
@keyframes zoom-in-zoom-out {
    0% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.25, 1.25);
    }

    100% {
        transform: scale(1, 1);
    }
}

.message {
    text-align: center;
    font-weight: bold;
}

#board {
    width: 250px;
    height: 250px;
    background-size: 250px 250px;
}

#board.dark, #board.jrpg, #board.wario {
    background-image: url("../assets/images/blackboard.png");
}

#board.light, #board.minecraft, #board.joker {
    background-image: url("../assets/images/whiteboard.png");
}

.row {
    display: flex;
    justify-content: center;
    height: 33%;
}

.player-score {
    text-align: center;
}

.hidden {
    visibility: hidden;
}

.timer {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
}

#time-title {
    width: 50%;
    text-align: right;
}

#time-remaining {
    width: 50%;
    text-align: left;
}

@media (min-width: 576px) {
    #board {
        width: 360px;
        height: 360px;
        background-size: 360px 360px;
    }

}

@media (min-width: 768px) {
    #board {
        width: 480px;
        height: 480px;
        background-size: 480px 480px;
    }
}

@media (min-width: 992px) {
    #board {
        width: 600px;
        height: 600px;
        background-size: 600px 600px;
    }
}

@media (min-width: 1280px) {
    @keyframes zoom-in-zoom-out {
        0% {
            transform: scale(1, 1);
        }

        50% {
            transform: scale(1.5, 1.5);
        }

        100% {
            transform: scale(1, 1);
        }
    }

    #board {
        width: 250px;
        height: 250px;
        background-size: 250px 250px;
    }
}

@media (min-width: 2560px) {
    #board {
        width: 400px;
        height: 400px;
        background-size: 400px 400px;
    }
}

@media (min-width: 3840px) {
    #board {
        width: 700px;
        height: 700px;
        background-size: 700px 700px;
    }
}

</style>