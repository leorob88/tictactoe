<script setup>

import { capitalize } from "vue";
import { settings } from "../assets/js/Settings.js";

const props = defineProps({
    id: {
        type: String
    },
    theme: {
        type: Number
    }
});

const themeId = "theme-" + props.id;

</script>

<template>
    <input type="radio" :id="themeId" class="radio" name="theme-radio" :checked="settings.data.theme == props.theme" @click="settings.data.theme = props.theme" />
    <label class="theme-element" :for="themeId">{{ capitalize(settings.themes[theme]) }}</label>
</template>

<style>

.radio {
    width: 7px;
    height: 7px;
}

.theme-element {
    margin-right: 8px;
}

@media (min-width: 2560px) {
    .radio {
        width: 13px;
        height: 13px;
    }

    .theme-element {
        margin-right: 15px;
    }
}

@media (min-width: 3840px) {
    .radio {
        width: 18px;
        height: 18px;
    }

    .theme-element {
        margin-right: 18px;
    }
}

</style>