<script setup>

import { inject } from 'vue';
import { settings } from "../assets/js/Settings.js";

let line = inject("line");

const emit = defineEmits(["cpu"]);
const props = defineProps({
  classes: {
    type: String
  },
  position: {
    type: String
  }
});

// detects effect of the move by storing it and checking for a winner or draw
function cellPlay(position) {
  if (settings.game.movesDone[position] == "" && settings.game.playing) {
    if (settings.game.currentPlayer == 1) {
      settings.game.movesDone[position] = settings.game.player1Sign;
    } else {
      settings.game.movesDone[position] = settings.game.player2Sign;
    }
    settings.game.hoveredCell = "";
    checkWinner();
    if (settings.game.tris) {
      settings.game.playing = false;
      line();
    } else {
      checkDraw();
      if (settings.game.playing) {
        if (settings.game.currentPlayer == 1) {
          settings.game.currentPlayer = 2;
          if (settings.game.vsCpu) {
            emit("cpu");
          }
        } else {
          settings.game.currentPlayer = 1;
        }
        settings.game.remainingTime = 20;
      }
    }
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

function checkWinner() {
  for (let a = 0; a < settings.winningCombinations.length; a++) {
    let triad = settings.winningCombinations[a];
    let xTris = false, oTris = false;
    if (settings.game.movesDone[triad[0]] == "X" && settings.game.movesDone[triad[1]] == "X" && settings.game.movesDone[triad[2]] == "X") {
      xTris = true;
      settings.game.winner = settings.data.player1;
      settings.game.winnerId = 1;
      settings.game.player1Score++;
      settings.game.winnerScore = settings.game.player1Score;
    }
    else if (settings.game.movesDone[triad[0]] == "O" && settings.game.movesDone[triad[1]] == "O" && settings.game.movesDone[triad[2]] == "O") {
      oTris = true;
      settings.game.winner = settings.data.player2;
      settings.game.winnerId = 2;
      settings.game.player2Score++;
      settings.game.winnerScore = settings.game.player2Score;
    }
    if (xTris || oTris) {
      settings.game.tris = true;
      settings.game.winningTriad.index = a;
      settings.game.winningTriad.cells = triad;
      break;
    }
  }
}

</script>

<template>
  <div :class="['cell', settings.themes[settings.data.theme], props.classes, { 'selected': settings.game.hoveredCell == props.position && settings.game.movesDone[props.position] == '' && settings.game.playing }]">
    <span :id="props.position" @mouseenter="settings.game.hoveredCell = position" @mouseleave="settings.game.hoveredCell = ''" @click="cellPlay(props.position)">
      {{ settings.game.movesDone[props.position] }}
    </span>
  </div>
</template>

<style>

.cell {
  display: table;
  width: 33%;
  padding: 0;
  margin: 0;
  border-color: rgba(0, 0, 0, 0);
  text-align: center;
  background-color: transparent;
}

span {
  display: table-cell;
  vertical-align: middle;
  font-size: 4.5em;
}

.selected {
  border: solid 1px orange;
  border-radius: 1px;
}

.cell.dark, .cell.jrpg, .cell.wario {
  color: rgb(239, 239, 239);
}

.cell.light, .cell.minecraft, .cell.joker {
  color: rgb(51, 51, 51);
}

.up-cell.dark, .up-cell.jrpg, .up-cell.wario {
  border-bottom: 2px solid;
  border-bottom-color: rgb(255, 255, 255);
}

.left-cell.dark, .left-cell.jrpg, .left-cell.wario {
  border-right: 2px solid;
  border-right-color: rgb(255, 255, 255);
}

.down-cell.dark, .down-cell.jrpg, .down-cell.wario {
  border-top: 2px solid;
  border-top-color: rgb(255, 255, 255);
}

.right-cell.dark, .right-cell.jrpg, .right-cell.wario {
  border-left: 2px solid;
  border-left-color: rgb(255, 255, 255);
}

.up-cell.light, .up-cell.minecraft, .up-cell.joker {
  border-bottom: 2px solid;
  border-bottom-color: rgb(0, 0, 0);
}

.left-cell.light, .left-cell.minecraft, .left-cell.joker {
  border-right: 2px solid;
  border-right-color: rgb(0, 0, 0);
}

.down-cell.light, .down-cell.minecraft, .down-cell.joker {
  border-top: 2px solid;
  border-top-color: rgb(0, 0, 0);
}

.right-cell.light, .right-cell.minecraft, .right-cell.joker {
  border-left: 2px solid;
  border-left-color: rgb(0, 0, 0);
}

@media (min-width: 576px) {
  span {
    font-size: 3.5em;
  }
}

@media (min-width: 768px) {
  span {
    font-size: 3.3em;
  }
}

@media (min-width: 992px) {
  span {
    font-size: 3em;
  }
}

@media (min-width: 1280px) {
  span {
    font-size: 3.2em;
  }
}

@media (min-width: 1600px) {
  span {
    font-size: 2.8em;
  }
}

@media (min-width: 1920px) {
  span {
    font-size: 3.3em;
  }

  .selected {
    border: solid 2px orange;
    border-radius: 2px;
  }
}

@media (min-width: 2560px) {
  span {
    font-size: 2.7em;
  }
}

@media (min-width: 3840px) {
  span {
    font-size: 2.6em;
  }
}

</style>