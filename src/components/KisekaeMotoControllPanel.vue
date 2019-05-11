<template>
    <div id="controll-panel">

{{selectedMotoName}}

        <ul class="collapsible">
            <li
                v-for="parts in partsImgList"
                v-bind:key="parts.fileName"
            >
                <div class="collapsible-header"><i class="material-icons">arrow_drop_down</i>{{parts.name}}</div>
                <div class="collapsible-body" v-bind:id="'controll-panel-' + parts.fileName + '-wrapper'">
                    <label
                    class="controll-panel-label col s12 m3" 
                    v-for="settings in controllPanelSettings"
                    v-bind:key="parts.fileName + '' + settings.key"
                    >
                        <span>{{settings.name}}</span>

                        <input
                            type="range"
                            class="controll-panel-input"
                            v-bind:id="'controll-panel-' + parts.fileName + '-' + settings.key"
                            v-bind:max="settings.max"
                            v-bind:partsname="parts.fileName"
                            v-bind:settingname="settings.key"
                            v-on:input="onSettingValueChange"
                        />

                    </label>
                </div>
            </li>
        </ul>

        <div id="action-buttons">
            <a id="button-save-conditions" class="waves-effect waves-light btn" v-on:click="onSettingValueSaveButtonClick">
                <i class="material-icons left">save</i>現在の設定を保存
            </a>
        </div>

    </div>
</template>

<script>
import $ from "jquery"
import { LOCAL_STORAGE_KEYS } from "../constants/constants.js"
import { setTimeout } from 'timers';

export default {
    name: 'KisekaeMotoControllPanel',

    props: {
        partsImgList: Array,
        controllPanelSettings: Object,
        updateParts: Function,
        selectedMotoName: String,
    },

    watch: {
        selectedMotoName: function(newVal, oldVal){
console.log("SELECTED MOTO NAME CHANGED!!")

            this.setStorage2InputField()

        

        }
    },

    mounted: function(){

        // 設定初期情報を画面にロード
        this.setStorage2InputField()
    },

    methods: {

        /**
         * LocalStorageの値をinputフィールドに展開する
         */
        setStorage2InputField: function(){


console.log("[setStorage2InputField]")

            // 前回保存情報を展開
            let savedCondition = {}

            const defaultCondition = {
                "controll-panel-gn_fender-brightness": "80",
                "controll-panel-gn_fender-hue-rotate": "0",
                "controll-panel-gn_fender-saturate": "100",
                "controll-panel-gn_headlight-brightness": "80",
                "controll-panel-gn_headlight-hue-rotate": "0",
                "controll-panel-gn_headlight-saturate": "100",
                "controll-panel-gn_sheet-brightness": "80",
                "controll-panel-gn_sheet-hue-rotate": "0",
                "controll-panel-gn_sheet-saturate": "100",
                "controll-panel-gn_sidecover-brightness": "80",
                "controll-panel-gn_sidecover-hue-rotate": "0",
                "controll-panel-gn_sidecover-saturate": "100",
                "controll-panel-gn_tank-brightness": "80",
                "controll-panel-gn_tank-hue-rotate": "0",
                "controll-panel-gn_tank-saturate": "100"
            }

            // 展開可能であれば展開, NGならエラーを握りつぶす
            try{
                savedCondition = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS[this.selectedMotoName]))
console.log(savedCondition)
                if(!savedCondition["controll-panel-gn_fender-brightness"])
                    savedCondition = defaultCondition
            }
            catch(e){
                savedCondition = defaultCondition
            }

            // ホントはやりたくないが...どうにもうまく動かない時があるので
            setTimeout(()=> {
                // 前回保存情報を画面にセット
                Object.keys(savedCondition || {})
                    .forEach(key=> {

                        $("#" + key).val(savedCondition[key])
                    })
            }, 1)

        },

        /**
         * 設定値変更時のイベントハンドラ
         */
        onSettingValueChange: function(event){

            this.updateParts(event)

        },

        /**
         * 設定を保存ボタン押下時イベントハンドラ
         */
        onSettingValueSaveButtonClick: function(){
            // 現在のパラメータ状態
            const currentCondition = {}

            $(".controll-panel-input")
                .each((i, v)=> {
                    currentCondition[$(v).attr("id")] = $(v).val()
                })

            // LocalStorageに保存
            window.localStorage.setItem(LOCAL_STORAGE_KEYS[this.selectedMotoName], JSON.stringify(currentCondition))

            alert("現在の設定を保存しました")
        },

    }

}

</script>

<style scoped>

.controll-panel-title{
   display: block;
   font-weight: 600;
}

#action-buttons{
   text-align: center;
}
#button-save-conditions{
   width: 80%;
}

@media screen and (min-width:1024px) {

#controll-panel{
   position: fixed;
   bottom: 4px;
   left: 0;
   z-index: 101;
   width: 192px;
}
.collapsible{
   margin-bottom: 2px !important;
   opacity: 0.8;
}
.collapsible-body{
   background-color: #fff;
}

#button-save-conditions{
   width: 100%;
}


}
</style>
