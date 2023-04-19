<script setup>

import { capitalize } from 'vue';
import { settings } from "../assets/js/Settings.js";

</script>

<template>
    <div id="current-settings" class="center-text">
        Player 1 name: {{ settings.data.player1 }}
        <br />
        Player 2 name: {{ settings.data.player2 }}
        <br />
        Timer: {{ settings.data.timer ? "Enabled" : "Disabled" }}
        <br />
        Theme: {{ capitalize(settings.themes[settings.data.theme]) }}
    </div>
</template>