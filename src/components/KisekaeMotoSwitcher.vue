<template>
    <ul id="moto-switcher-wrapper">
        <li
            v-for="(def, key) in motoDefinitions"
            v-bind:key="key"
            class="moto-switcher-li"
        >
            <div
                class="moto-switcher-img"
                v-bind:motoname="key"
                v-bind:style="{backgroundImage: 'url(' + def.mainImgPath + ')'}"
                v-on:click="onMotoClick"
            />
        </li>
    </ul>
</template>

<script>
import $ from "jquery"

export default {
    name: 'KisekaeMotoSwitcher',

    props: {
        motoDefinitions: Object,
        motoSwitcherCallback: Function,
    },

    methods: {
        onMotoClick: function(event){

            const motoName = $(event.target).attr("motoname")

            this.motoSwitcherCallback(motoName)
        }
    }
}
</script>

<style scoped>

#moto-switcher-wrapper{
    position: fixed;
    top: 72px;
    left: 4px;
}

.moto-switcher-li{
    margin: 8px;
}

.moto-switcher-img {
    width: 128px;
    height:128px;
    border-radius: 64px;
    border: solid 4px #00897b;
    background-position: center;
    background-size: cover;
    box-shadow: 4px 4px 12px 6px rgba(0, 0, 0, 0.25);

}

</style>
