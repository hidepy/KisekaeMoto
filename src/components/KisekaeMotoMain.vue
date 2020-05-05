<template>
<div id="kisekae-moto-main-wrapper">
    <div id="main-images-panel">

        <div id="moto-images" class="moto-images">
            <img id="moto-image-gn125-front" v-bind:src="mainImgPath" />

            <img
                class="moto-parts"
                v-for="partsImg in partsImgList" 
                v-bind:key="partsImg.fileName"
                v-bind:id="'moto-parts-' + partsImg.fileName"
                v-bind:src="filePath + partsImg.fileName + '.png'"
                v-bind:style="{ position: 'absolute', top: partsImg.top * adjustRatio + 'px', left: partsImg.left * adjustRatio + 'px', width: partsImg.width * adjustRatio + 'px'}"
            />
        </div>

        <KisekaeMotoSwitcher
            v-bind:moto-definitions="motoDefinitions"
            v-bind:moto-switcher-callback="motoSwitcherCallback"
        />

        <DownloadButton
            v-bind:selector-base-img="'#moto-image-gn125-front'"
            v-bind:selector-parts-img="'.moto-parts'"
        />

        <span style="position: absolute; top: 4px; left: 4px; background-color: rgba(255, 255, 255, 0.65); font-size: 11px; padding: 4px; border-radius: 4px;">{{selectedMotoName}}:{{(adjustRatio || 0).toFixed(3)}}</span>

    </div>

    <KisekaeMotoControllPanel
        v-bind:parts-img-list="partsImgList"
        v-bind:controll-panel-settings="controllPanelSettings"
        v-bind:update-parts="updateParts"
        v-bind:refresh-all-parts="refreshAllParts"
        v-bind:selected-moto-name="selectedMotoName"
    />

</div>
</template>

<script>
import $ from "jquery"
import { LOCAL_STORAGE_KEYS } from "../constants/constants.js"
import motoDefinitions from "../constants/motoDefinitions.js"
import KisekaeMotoSwitcher from "./KisekaeMotoSwitcher.vue"
import KisekaeMotoControllPanel from "./KisekaeMotoControllPanel.vue"
import DownloadButton from './DownloadButton.vue'
import { setTimeout } from 'timers';

export default {
    name: 'KisekaeMotoMain',

    components: {
        KisekaeMotoControllPanel,
        KisekaeMotoSwitcher,
        DownloadButton
    },

    data: function () {
      return {
        selectedMotoName: "",//localStorage[LOCAL_STORAGE_KEYS.SELECTED_MOTO_NAME] || "GN125",
        mainImgPath: "",
        partsImgList: [],
        filePath: "",
        motoDefinitions: motoDefinitions,
        controllPanelSettings: controllPanelSrc,
        adjustRatio: ($("#moto-image-gn125-front").width() || document.body.clientWidth) / 1280
      }
    },

    mounted: function(){

        // 選択中のバイクを更新
        this.selectedMotoName = localStorage[LOCAL_STORAGE_KEYS.SELECTED_MOTO_NAME] ||  "GN125"

        // 画像情報の更新及び描画の管理
        this.updateImgDef()

        // 画面リサイズ時に再描画を仕掛ける
        $(window).resize(()=> {
            //再描画
            this.refreshAllParts()
        })

        // // Foldableコンポーネントのセットアップ
        // window.M.Collapsible.init(document.querySelectorAll(".collapsible"), {})
        
        
        // TODO: どうにも初回に色がうまく変更されないことがあるんで一応...
        setTimeout(()=> {
            this.refreshAllParts()
        }, 1000)
        

    },

    methods: {

        /**
         * バイク切り替えボタン押下時イベントハンドラ
         */
        motoSwitcherCallback: function(motoName){

            // 選択中のバイクを変更
            this.selectedMotoName = motoName

            // 全体を再描画
            this.updateImgDef()


        },

        /**
         * Imgが全てロードされたことを保証するためのメソッド
         */
        updateImgDef: function(){

console.log("[updateImgDef]")

            // バイクごと定義を取得
            const motoDef = this.motoDefinitions[this.selectedMotoName]

            // 部品情報のロード
            this.partsImgList = motoDef.partsDef

            // パスの更新
            this.mainImgPath = motoDef.mainImgPath
            this.filePath = motoDef.partsPath

            setTimeout(()=> {

console.log("[updateImgDef#setTimeout]")

                // 画像が全てロードされた後でないと、refreshしてもバグるので対策
                const imgs = $(".moto-parts, #moto-image-gn125-front")

                let count = 0

                imgs.on("load", ()=> {
                    count++

console.log("[updateImgDef#setTImeout] count:" + count)

                    // 部品全描画(コストは高いが、全件ロード待ちがちょと挙動怪しかったのでやむなし...)
                    this.refreshAllParts()


                    // TODO: ↓これがほぼ正しいはずだが...稀に画像がフルカウントされない...仕方ないので、一旦settimeoutでopacityはいい感じのタイミングで1に設定して...

//                     if(count >= imgs.length){
// console.log("[updateImgDef#setTimeout#setTimeout]")
//                         setTimeout(()=> {
//                             // 部品描画
//                             //this.refreshAllParts()

//                             // opacityを0から1に
//                             imgs.css({opacity: 1})
//                         }, 1)
//                     }
                })

                imgs.on("error", (error)=> {
                    console.log("something wrong... on loading imgs...");
                    console.log(error);

                    console.log($(error.target).attr("id"))

                    

                    // alert("画像情報のロードに失敗しました...ページをリフレッシュして再度お試しください...")
                    M.toast({html: "画像のロードに失敗...ページをリフレッシュして下さい...(" + $(error.target).attr("id") + ")"})
                })

                
                // TODO: 苦しいが...暫定...
                setTimeout(()=> {
                    imgs.css({opacity: 1})

                    
                }, 1000)

            }, 1)
        },

        /**
         * パーツ画像全件の再描画
         */
        refreshAllParts: function(){

console.log("[refreshAllParts] driven!!");

            const maxImgHeight = window.innerHeight * 4 / 3 - 1 - 74
            $("#moto-images").css("max-width", maxImgHeight)
            // $("#moto-images").css("height", maxImgHeight)

            // 画像側から幅を取得, なければ強制的に画面幅を入れ込む
            //const imgWidth = $("#moto-images").width()
            const imgWidth = $("#moto-image-gn125-front").width() || document.body.clientWidth

            this.adjustRatio = imgWidth / 1280;

console.log(`adjuestRatio:${this.adjustRatio}`, imgWidth);

            // 部品の色を変更して描画
            (this.partsImgList || [])
                .map(v=> {
                    return {
                        target: document.querySelector(`#controll-panel-${v.fileName}-hue-rotate`)
                    }
                })
                .forEach(v=> {

                    this.updateParts(v)

                })
        },

        /**
         * 部品の状態を更新する
         */
        updateParts: function(event){

            // 部品名の取り出し
            const partsName = $(event.target).attr("partsname")

            // wrapperのidを組み立て
            const wrapperId = `controll-panel-${partsName}-wrapper`

            // 適用するfilterのスタイルを組み立て
            let filterStyle = ""

            // idを基に、部品に紐づく設定情報を取得
            $(`#${wrapperId} .controll-panel-input`)
                .each((i, v)=> {

                    const localControllName = $(v).attr("settingname")

                    const val = `${localControllName}(${$(v).val()}${unitMap[localControllName]})`

                    filterStyle += val + " "
                })

            // 作成した結果を適用
            $(`#moto-parts-${partsName}`).css("filter", filterStyle)
        }
    },
}

/**
 * 部品の色など変更情報定義
 */
const controllPanelSrc = {
    "hue-rotate": {
        key: "hue-rotate",
        name: "色",
        max: 360,
    },
    "saturate": {
        key: "saturate",
        name: "鮮やかさ",
        max: 500
    },
    "brightness": {
        key: "brightness",
        name: "明るさ",
        max: 500
    }
}

/**
 * キーに紐づく単位情報
 */
const unitMap = {
    "hue-rotate": "deg",
    "saturate": "%",
    "brightness": "%",
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#kisekae-moto-main-wrapper{
    padding-top: 42px;
}

#main-images-panel{
   position: fixed;
   z-index: 10;
}

.moto-images{
   /* width: 100%; */
   width: 100vw;
   /* height: calc(100vw * 3 / 4); */
   max-width: 880px;
}
.moto-images #moto-image-gn125-front{
   width: 100%;
   z-index: 1;
   /* iOS safariで、途中から部品画像がメイン画像の背面に表示されてしまう不具合があるので修正 */
   position: absolute;
}
.moto-images .moto-parts{
   width: 100%;
   z-index: 5;
   opacity: 0.1;
   transition: opacity 0.3s;

   position: absolute;
}
.moto-images{
   position: relative;
}

/*@media screen and (min-width:1024px) {*/
@media screen and (min-width:568px) {

#kisekae-moto-main-wrapper{
    padding-top: 56px;
}

#main-images-panel{
   position: relative;
}

@media screen and (min-width:888px) {


}
</style>
