<template>
    <div id="controll-panel">

        <a
            id="button-toggle-menu-state" 
            class="waves-effect waves-light btn"
            v-on:click="toggleMenuDisplayState"
        >
            メニューを{{!!menuDisplayState ? "非表示にする" : "表示する"}}
        </a>

        <ul class="collapsible" v-bind:class="{ hideMenu: !menuDisplayState }">
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
                        <span class="controll-panel-span">{{settings.name}}:</span>

                        <input
                            type="range"
                            class="controll-panel-input"
                            min="0"
                            v-bind:id="'controll-panel-' + parts.fileName + '-' + settings.key"
                            v-bind:max="settings.max"
                            v-bind:partsname="parts.fileName"
                            v-bind:settingname="settings.key"
                            v-on:input="onSettingValueChange"
                            v-on:change="onSettingValueChange"
                        />

                        <input
                            type="number"
                            step="1"
                            class="controll-panel-input-text"
                            min="0"
                            v-bind:id="'controll-panel-' + parts.fileName + '-' + settings.key + '-text'"
                            v-bind:max="settings.max"
                            v-bind:partsname="parts.fileName"
                            v-bind:settingname="settings.key"
                            v-on:change="onSettingTextValueChange"
                        />

                    </label>
                </div>
            </li>
        </ul>

        <div id="action-buttons" v-bind:class="{ hideMenu: !menuDisplayState }">

            <a id="button-reset-conditions" class="waves-effect waves-light btn blue-grey darken-2" v-on:click="onResetButtonClick" >
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

        if(window.innerWidth < 1080){
            // スマホの場合の高さ調整
            const controllHeight = window.innerHeight - 42 - 280
            $("#controll-panel").css("height", ( controllHeight > 250 ? controllHeight : 250 ) + "px")
        }

        // 設定初期情報を画面にロード
        this.setStorage2InputField()

    },

    data: function () {
      return {
        menuDisplayState: true, // メニュー表示状態
      }
    },

    methods: {

        /**
         * メニュー表示状態を変更
         */
        toggleMenuDisplayState: function(){
            this.menuDisplayState = !this.menuDisplayState
        },

        /**
         * LocalStorageの値をinputフィールドに展開する
         */
        setStorage2InputField: function(){


            console.log("setStorage2InputField comes")

            // バイクが未選択状態であれば終了
            if(!this.selectedMotoName) return

            // 前回保存情報を展開
            let savedCondition = {}

            // 初期値定義
            let defaultCondition = this.getInitialDef()

            console.log("setStorage2InputField comes2")
            console.log(defaultCondition)
            console.log(this.selectedMotoName)

            // 展開可能であれば展開, NGならエラーを握りつぶす
            try{
                console.log(window.localStorage)
                savedCondition = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS[this.selectedMotoName]))

                if(Object.keys(savedCondition) <= 0)
                    savedCondition = defaultCondition
            }
            catch(e){
                savedCondition = defaultCondition
            }

            console.log(savedCondition)

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

                        $("#" + key + "-text").val(params[key])
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
                                : vi.key.indexOf("hue-rotate") >= 0 
                                    ? "0" :
                                        vi.key.indexOf("saturate") >= 0 
                                            ? "200"
                                                : "100"

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
         * 設定値変更時のイベントハンドラ(input type=text)
         */
        onSettingTextValueChange: function(event){

            //console.log(event)

            const newVal = $(event.target).val()

            const tgtId = event.target.id.replace("-text", "")

            // 更新先の要素を取得
            const tgtEl = document.getElementById(tgtId)

            // input type=rangeに値をセット
            $(tgtEl).val(newVal)

            // onChangeのフローに載せる
            this.onSettingValueChange({target: tgtEl})

            // 部分を再描画
            //this.updateParts()

        },

        /**
         * 設定値変更時のイベントハンドラ(input type=range)
         */
        onSettingValueChange: function(event){

            //console.log(event);

            const newVal = $(event.target).val()

            const tgtId = event.target.id + "-text"

            $("#" + tgtId).val(newVal)

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

#button-toggle-menu-state{
    width: 100%;

    display: none;
}
.hideMenu{
    display: none;
}

#controll-panel .collapsible-body .controll-panel-label .controll-panel-span{
    display: block;
}
#controll-panel .collapsible-body .controll-panel-label .controll-panel-input{
    display: inline-block;
    width: calc(100% - 48px);
}
#controll-panel .collapsible-body .controll-panel-label .controll-panel-input-text{
    display: inline-block;
    width: 48px;
    text-align: right;
}

#controll-panel{
    /* padding-top: calc(100vw * 3 / 4); */
    max-height: calc(100vh - 44px);
    width: 100%;
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

@media screen and (min-width:1080px) {
/* @media screen and (min-width:568px) { */

#button-toggle-menu-state{
    display: none;
}

#controll-panel .collapsible-body{
    padding: 0.5rem;
}
#controll-panel .collapsible-body .controll-panel-label{
    width: 100%;
    display: block;
}

#controll-panel{
    flex-grow: 1;
   /* position: fixed; */
   padding: 8px;
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
