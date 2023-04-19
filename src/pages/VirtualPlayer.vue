<script setup>

import { settings } from "../assets/js/Settings.js";

function startGame(secondPlayer) {
    if (secondPlayer == 1) { settings.game.vsCpu = true; }
    settings.visibility.newGameVisible = true;
    settings.visibility.virtualVisible = false;
}

</script>

<template>
    <div id="ai-player">
        <div class="center-text">
            <p>Are you playing vs CPU or a friend?</p>
        </div>
        <div class="center-text padded">
            <div class="inherit-size">
                <button id="btn-alone" :class="settings.themes[settings.data.theme]" @click="startGame(1)">CPU</button>
                <button id="btn-friend" :class="settings.themes[settings.data.theme]" @click="startGame(2)">Friend</button>
            </div>
        </div>
    </div>
</template>

<style>

#ai-player {
  padding-top: 100px;
}

@media (min-width: 1280px) {
    #ai-player {
    padding-top: 150px;
  }
}

@media (min-width: 1920px) {
    #ai-player {
    padding-top: 200px;
  }
}

</style>