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
import { LOCAL_STORAGE_KEYS } from '../constants/constants';

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

            // LocalStorageの選択中バイクの値を更新
            window.localStorage[LOCAL_STORAGE_KEYS.SELECTED_MOTO_NAME] = motoName
        }
    }
}
</script>

<style scoped>

#moto-switcher-wrapper{
    position: fixed;
    top: 36px;
    right: 4px;
    z-index: 200;

    height: calc(90vw * 3 / 4);
    overflow: scroll;
    overflow-x: hidden;
}

.moto-switcher-li{
    margin: 2px;
}

.moto-switcher-img {
    width: 64px;
    height:64px;
    border-radius: 64px;
    border: solid 4px #00897b;
    background-position: center;
    background-size: cover;
    box-shadow: 4px 4px 12px 6px rgba(0, 0, 0, 0.25);

}

/*@media screen and (min-width:1024px) {*/
@media screen and (min-width:568px) {

#moto-switcher-wrapper{
    top: 72px;
}

.moto-switcher-li{
    margin: 8px;
}

.moto-switcher-img {
    width: 128px;
    height:128px;
}

}

</style>
