<template>
    <div id="controll-panel">

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
                        <span>{{settings.name}}:</span>

                        <input
                            type="range"
                            class="controll-panel-input"
                            v-bind:id="'controll-panel-' + parts.fileName + '-' + settings.key"
                            v-bind:max="settings.max"
                            v-bind:partsname="parts.fileName"
                            v-bind:settingname="settings.key"
                            
                            v-on:change="onSettingValueChange"
                        />

                    </label>
                </div>
            </li>
        </ul>

        <div id="action-buttons">

            <a id="button-reset-conditions" class="waves-effect waves-light btn blue-grey darken-2" v-on:click="onResetButtonClick">
                <i class="material-icons left">remove</i>初期値に戻す
            </a>

            <a id="button-save-conditions" class="waves-effect waves-light btn" v-on:click="onSettingValueSaveButtonClick">
                <i class="material-icons left">save</i>現在の設定を保存
            </a>

            <a id="button-remove-conditions" class="waves-effect waves-light btn blue-grey darken-2" v-on:click="onSettingResetButtonClick">
                <i class="material-icons left">remove_circle</i>保存済の設定を削除
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
        refreshAllParts: Function,
        selectedMotoName: String,
    },

    watch: {
        /**
         * MotoNameの監視
         */
        selectedMotoName: function(newVal, oldVal){

            this.setStorage2InputField()

            // Foldableコンポーネントのセットアップ
            window.M.Collapsible.init(document.querySelectorAll(".collapsible"), {})

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

            // バイクが未選択状態であれば終了
            if(!this.selectedMotoName) return

            // 前回保存情報を展開
            let savedCondition = {}

            // 初期値定義
            let defaultCondition = this.getInitialDef()

            // 展開可能であれば展開, NGならエラーを握りつぶす
            try{
                savedCondition = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS[this.selectedMotoName]))

                if(Object.keys(savedCondition) <= 0)
                    savedCondition = defaultCondition
            }
            catch(e){
                savedCondition = defaultCondition
            }

            // ホントはやりたくないが...どうにもうまく動かない時があるので
            setTimeout(()=> {

                // 入力コンポーネントにセット
                this.setValues2InputField(savedCondition)

                // コンポーネントにセット後再描画しないと、バイクの色が意図しない色で描画されてしまうためダメ押し
                // あるべきとしては、親からsetting valueをもらって、それを画面描画するだけにしておくのが正しそうだが直すの面倒なんで...
                this.refreshAllParts()

            }, 1)

        },

        /**
         * 与えられたオブジェクトを入力フィールドにセット
         */
        setValues2InputField: function(params){
                // 前回保存情報を画面にセット
                Object.keys(params || {})
                    .forEach(key=> {

                        $("#" + key).val(params[key])
                    })
        },

        /**
         * controllの初期値を取得する
         */
        getInitialDef: function(){
            // 初期値定義
            let defaultCondition = {}

            for(let v of this.partsImgList){

                for(let key of Object.keys(this.controllPanelSettings)){

                    const vi = this.controllPanelSettings[key]

                    let val = 
                        v[vi.key] !== undefined 
                            ? v[vi.key] 
                            :  (vi.key.indexOf("hue-rotate") >= 0 ? "0" : "100")

                    defaultCondition[`controll-panel-${v.fileName}-${vi.key}`] = val

                }

            }

            return defaultCondition
        },

        /**
         * 初期値に戻すボタン押下時
         */
        onResetButtonClick: function(){

            const defaultParams = this.getInitialDef()

            // 初期値を生成し、入力フィールドにセット
            this.setValues2InputField(defaultParams)

            // 画面再描画
            this.refreshAllParts()
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

        onSettingResetButtonClick: function(){

            if(window.confirm("設定を削除しますか？")){
                // 値を削除する
                window.localStorage.removeItem(LOCAL_STORAGE_KEYS[this.selectedMotoName])
            }
            
        }

    }

}

</script>

<style scoped>

#controll-panel{
    padding-top: calc(100vw * 3 / 4);
    max-height: calc(100vh - 44px);
    overflow-y: scroll;
}

.controll-panel-title{
   display: block;
   font-weight: 600;
}

#action-buttons{
   text-align: center;
}
#action-buttons .btn{
    width: 80%;
   margin-bottom: 4px;
}

/*@media screen and (min-width:1024px) {*/
@media screen and (min-width:568px) {

#controll-panel{
   position: fixed;
   padding-top: 0;
   bottom: 4px;
   left: 0;
   z-index: 101;
   width: 192px;
   max-height: calc(100vh - 58px);
   overflow-y: auto;
}
.collapsible{
   margin-bottom: 2px !important;
   opacity: 0.8;
   z-index: 210;
}
.collapsible-body{
   background-color: #fff;
}

#action-buttons .btn{
   width: 100%;
}


}
</style>
