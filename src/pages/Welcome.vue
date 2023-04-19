<script setup>

import CurrentSettings from "../components/CurrentSettings.vue";
import { settings } from "../assets/js/Settings.js";

function randomPlayer() {
    let randomPlayer = Math.floor(Math.random() * 2) + 1;
    settings.game.currentPlayer = randomPlayer;
}

function startGame() {
    settings.visibility.virtualVisible = true;
    settings.visibility.welcomeVisible = false;
    randomPlayer();
}

function editSettings() {
    settings.tempData.player1 = settings.data.player1;
    settings.tempData.player2 = settings.data.player2;
    settings.tempData.theme = settings.data.theme;
    settings.tempData.timer = settings.data.timer;
    settings.visibility.settingsVisible = true;
    settings.visibility.welcomeVisible = false;
    randomPlayer();
}

</script>

<template>
    <div id="welcome" class="dn-padded">
        <div class="center-text">
            <p>Hi! This is a Tic Tac Toe game app!
                <br />
                Before getting started, just know that...
                <br />
                <br />
                These are the basic settings:
            </p>
            <br />
            <CurrentSettings />
            <br />
        </div>
        <div class="center-text">
            <div>Is it ok?</div>
            <div class="inherit-size">
                <button id="btn-play" :class="settings.themes[settings.data.theme]" @click="startGame()">Play!</button>
                <button id="btn-edit" :class="settings.themes[settings.data.theme]" @click="editSettings()">Edit</button>
            </div>
        </div>
    </div>
</template>

<style>

#welcome {
  text-align: left;
}

</style>