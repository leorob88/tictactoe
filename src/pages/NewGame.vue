<script setup>

import { settings } from "../assets/js/Settings.js";


function startGame() {
  settings.visibility.gameVisible = true;
  settings.visibility.newGameVisible = false;
  settings.game.newGame = false;
  settings.game.playing = true;
}

</script>

<template>
    <div id="new-game">
        <div class="center-text">
            <p>First move to Player{{ settings.game.currentPlayer }}</p>
        </div>
        <div class="center-text padded">
            <div class="inherit-size">
                <button id="btn-start" :class="settings.themes[settings.data.theme]" @click="startGame()">Let's go!</button>
            </div>
        </div>
    </div>
</template>

<style>

#new-game {
  padding-top: 150px;
}

@media (min-width: 1920px) {
    #new-game {
    padding-top: 200px;
  }
}

</style>