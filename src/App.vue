<script setup>

import Welcome from "./pages/Welcome.vue";
import VirtualPlayer from "./pages/VirtualPlayer.vue";
import NewGame from "./pages/NewGame.vue";
import Game from "./pages/Game.vue";
import Settings from "./pages/Settings.vue";
import { settings } from "./assets/js/Settings.js";

// timer for players moves
let timer = setInterval(function () {
  if (settings.game.playing && settings.data.timer && !settings.game.paused) {
    settings.game.remainingTime--;
    if (settings.game.remainingTime == 0) {
      settings.game.timeUp = true;
      settings.game.playing = false;
      if (settings.game.currentPlayer == 1) {
        settings.game.winner = settings.data.player2;
        settings.game.winnerId = 2;
        settings.game.player2Score++;
        settings.game.winnerScore = settings.game.player2Score;
      }
      else {
        settings.game.winner = settings.data.player1;
        settings.game.winnerId = 1;
        settings.game.player1Score++;
        settings.game.winnerScore = settings.game.player1Score;
      }
    }
  }
}, 1000);

</script>

<template>
  <div id="main-page" :class="settings.themes[settings.data.theme]">
    <Welcome v-if="settings.visibility.welcomeVisible" />
    <VirtualPlayer v-if="settings.visibility.virtualVisible" />
    <NewGame v-if="settings.visibility.newGameVisible" />
    <Game v-if="settings.visibility.gameVisible" />
    <Settings v-if="settings.visibility.settingsVisible" />
  </div>
</template>

<style>

* {
  font-family: "Quicksand", "Verdana", "Arial", serif;
  font-size: 0.91em;
}

#main-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

#main-page.dark {
  background-color: rgb(23, 23, 23);
  color: rgb(238, 238, 238);
}

#main-page.light {
  background-color: rgb(238, 238, 238);
  color: rgb(26, 26, 26);
}

#main-page.jrpg {
  background-color: rgb(0, 34, 102);
  color: rgb(238, 238, 238);
}

#main-page.minecraft {
  background-color: rgb(117, 183, 71);
  color: rgb(26, 26, 26);
}

#main-page.wario {
  background-color: rgb(185, 175, 28);
  color: rgb(238, 238, 238);
}

#main-page.joker {
  background-color: rgb(161, 95, 253);
  color: rgb(26, 26, 26);
}

button {
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 2px;
  padding-bottom: 2px;
  border: outset 1px black;
}

button.dark {
  background-color: rgb(40, 40, 40);
  color: rgb(238, 238, 238);
}

button.dark:hover {
  background-color: rgb(55, 55, 55);
}

button.dark:disabled {
  background-color: rgb(32, 32, 32);
}

button.light {
  background-color: rgb(210, 210, 210);
  border-top-color: rgb(84, 84, 84);
  border-left-color: rgb(84, 84, 84);
  color: rgb(26, 26, 26);
}

button.light:hover {
  background-color: rgb(234, 234, 234);
}

button.light:disabled {
  background-color: rgb(186, 186, 186);
  border-top-color: rgb(170, 170, 170);
  border-left-color: rgb(170, 170, 170);
  border-bottom-color: rgb(116, 116, 116);
  border-right-color: rgb(116, 116, 116);
}

button.jrpg {
  background-color: rgb(93, 59, 25);
  color: rgb(238, 238, 238);
}

button.jrpg:hover {
  background-color: rgb(110, 76, 42);
}

button.jrpg:disabled {
  background-color: rgb(76, 42, 8);
}

button.minecraft {
  background-color: rgb(210, 141, 43);
  color: rgb(26, 26, 26);
}

button.minecraft:hover {
  background-color: rgb(237, 168, 70);
}

button.minecraft:disabled {
  background-color: rgb(183, 114, 16);
}

button.wario {
  background-color: rgb(84, 35, 112);
  color: rgb(238, 238, 238);
}

button.wario:hover {
  background-color: rgb(116, 67, 144);
}

button.wario:disabled {
  background-color: rgb(52, 3, 80);
}

button.joker {
  background-color: rgb(145, 196, 55);
  color: rgb(26, 26, 26);
}

button.joker:hover {
  background-color: rgb(180, 231, 90);
}

button.joker:disabled {
  background-color: rgb(110, 161, 20);
}

.dn-padded {
  padding-top: 25px;
}

.padded {
  padding-top: 10px;
}

.center-text {
  display: block;
  text-align: center;
}

button, input {
  margin: 2px;
  border-radius: 3px;
}

input {
  font-size: 0.9em;
}

.inherit-size {
  font-size: inherit;
  display: inline;
}

@media (min-width: 576px) {
  * {
    font-size: 1em;
  }

  button, input {
    margin: 4px;
    border-radius: 4px;
  }

  button {
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
}

@media (min-width: 768px) {
  * {
    font-size: 1.05em;
  }

  .padded {
    padding-top: 15px;
  }

  button, input {
    margin: 6px;
    border-radius: 5px;
  }

  button {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 3px;
    padding-bottom: 3px;
  }
}

@media (min-width: 992px) {
  * {
    font-size: 1.1em;
  }
}

@media (min-width: 1280px) {
  * {
    font-size: 1em;
  }

  .padded {
    padding-top: 18px;
  }
}

@media (min-width: 1600px) {

  .padded {
    padding-top: 20px;
  }

  button, input {
    margin: 8px;
    border-radius: 6px;
  }

  button {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
  }
}

@media (min-width: 2560px) {
  * {
    font-size: 1.1em;
  }

  .dn-padded {
    padding-top: 30px;
  }

  .padded {
    padding-top: 30px;
  }

  input {
    font-size: 1em;
  }

  button, input {
    margin: 15px;
    border-radius: 8px;
  }

  button {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: outset 2px black;
  }
}

@media (min-width: 3840px) {
  * {
    font-size: 1.2em;
  }

  .dn-padded {
    padding-top: 40px;
  }

  .padded {
    padding-top: 40px;
  }
}

</style>