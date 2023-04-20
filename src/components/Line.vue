<script setup>

import { settings } from "../assets/js/Settings.js";

</script>

<template>
    <svg id="svg" :style="{ width: + settings.game.svg_line.width + 'px', height: + settings.game.svg_line.height + 'px', left: + settings.game.svg_line.left + 'px', top: + settings.game.svg_line.top + 'px' }">
        <line id="line" :x1="settings.game.svg_line.x1" :y1="settings.game.svg_line.y1" :x2="settings.game.svg_line.x2" :y2="settings.game.svg_line.y2" />
    </svg>
</template>

<style>

svg {
  z-index: 3;
  position:absolute;
  left: 50;
  top: 50;
}

line {
  stroke:rgb(255,0,0);
  stroke-width: 1.5;
}

@media (min-width: 2560px) {
line {
  stroke-width: 4;
}
}

@media (min-width: 3840px) {
line {
  stroke-width: 6;
}
}

</style>