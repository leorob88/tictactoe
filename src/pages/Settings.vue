<script setup>

import { onMounted } from "vue";
import { settings } from "../assets/js/Settings.js";
import Theme from "../components/Theme.vue"

onMounted(() => {
  document.getElementById("player1-setup").addEventListener('input', updatePlayers);
  document.getElementById("player2-setup").addEventListener('input', updatePlayers);
})

function updatePlayers() {
  settings.data.player1 = document.getElementById("player1-setup").value || settings.tempData.player1;
  settings.data.player2 = document.getElementById("player2-setup").value || settings.tempData.player2;
}

function updateSettings() {
  settings.visibility.settingsVisible = false;
  if (settings.game.newGame) {
    settings.visibility.virtualVisible = true
  } else {
    settings.visibility.gameVisible = true;
    settings.game.paused = false;
  }
}

function undoSettings() {
  settings.data.player1 = settings.tempData.player1;
  settings.data.player2 = settings.tempData.player2;
  settings.data.theme = settings.tempData.theme;
  settings.data.timer = settings.tempData.timer;
  updateSettings();
}

</script>

<template>
  <div id="settings">
    <div class="center-text">
      <div class="padded">
        <p>Players names:</p>
        <input type="text" id="player1-setup" :class="['input-player', settings.themes[settings.data.theme]]" :placeholder="settings.data.player1" maxlength="16">
        <input type="text" id="player2-setup" :class="['input-player', settings.themes[settings.data.theme]]" :placeholder="settings.data.player2" maxlength="16">
      </div>
      <div class="padded">
        <input type="checkbox" :checked="settings.data.timer" id="timer-check" @click="settings.data.timer = !settings.data.timer" />
        <label for="timer-check">Timer</label>
      </div>
      <div class="padded">
        <p>Theme:</p>
        <div class="inherit-size" v-for="theme in settings.themes">
          <Theme :id=theme :theme=settings.themes.indexOf(theme) />
        </div>
      </div>
      <div class="padded">
        <button id="btn-ok" :class="settings.themes[settings.data.theme]" @click="updateSettings()">Ok</button>
        <button id="btn-cancel" :class="settings.themes[settings.data.theme]" @click="undoSettings()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style>

.input-player {
  padding: 4px;
}

#timer-check {
  width: 7px;
  height: 7px;
}

.input-player.dark {
  background-color: rgb(19, 19, 19);
  color: rgb(255, 255, 255);
}

.input-player.light {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

.input-player.jrpg {
  background-color: rgb(0, 25, 75);
  color: rgb(255, 255, 255);
}

.input-player.minecraft {
  background-color: rgb(87, 137, 53);
  color: rgb(0, 0, 0);
}

.input-player.wario {
  background-color: rgb(138, 131, 21);
  color: rgb(255, 255, 255);
}

.input-player.joker {
  background-color: rgb(116, 72, 178);
  color: rgb(0, 0, 0);
}

.input-player.wario::placeholder {
  color: rgb(197, 197, 197);
}

.input-player.minecraft::placeholder, .input-player.joker::placeholder {
  color: rgb(37, 37, 37);
}


@media (min-width: 1280px) {
  .input-player {
    padding: 4px;
  }

  #timer-check {
    width: 8px;
    height: 8px;
  }
}

@media (min-width: 1600px) {
  .input-player {
    padding: 5px;
  }
}

@media (min-width: 2560px) {
  #timer-check {
    width: 13px;
    height: 13px;
  }
}

@media (min-width: 3840px) {
  #timer-check {
    width: 18px;
    height: 18px;
  }
}

</style>