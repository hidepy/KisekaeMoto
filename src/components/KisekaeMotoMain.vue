<template>
  <div>
      <div id="main-images-panel">

          <div id="moto-images" class="moto-images">
              <img id="moto-image-gn125-front" src="img/gn125/base/motobase-gn125-front-1.jpg">                    

              <img
                  class="moto-parts"
                  v-for="partsImg in partsImgList" 
                  v-bind:key="partsImg.fileName"
                  v-bind:id="'moto-parts-' + partsImg.fileName"
                  v-bind:src="filePath + partsImg.fileName + '.png'"
                  v-bind:style="{ position: 'absolute', top: partsImg.top * adjustRatio + 'px', left: partsImg.left * adjustRatio + 'px', width: partsImg.width * adjustRatio + 'px'}"
              />
          </div>

          <DownloadButton
            v-bind:selector-base-img="'#moto-image-gn125-front'"
            v-bind:selector-parts-img="'.moto-parts'"
          />

      </div>

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

  </div>
</template>

<script>
import $ from "jquery"
import { LOCAL_STORAGE_KEY_GN125 } from "../constants/constants.js"
import motoPartsDefinitions from "../constants/motoPartsDefinitions.js"
import DownloadButton from './DownloadButton.vue'

export default {
    name: 'KisekaeMotoMain',

    components: {
        DownloadButton
    },

    props: {
    },

    data: function () {
      return {
        selectedMotoName: "GN125",
        partsImgList: motoPartsDefinitions["GN125"],
        controllPanelSettings: controllPanelSrc,
        filePath: "./img/gn125/parts/motobase-gn125-front-1/",
        adjustRatio: 1
      }
    },

    mounted: function(){

        // 部品情報のロード
        this.partsImgList = motoPartsDefinitions[this.selectedMotoName]

        // 画面リサイズ時に再描画を仕掛ける
        $(window).resize(()=> {
            //再描画
            this.refreshParts()
        })

        // 画像が全てロードされた後でないと、refreshしてもバグるので対策
        {
            const imgs = $(".moto-parts, #moto-image-gn125-front")

            let count = 0

            imgs.on("load", ()=> {
                count++

                if(count >= imgs.length){

                    setTimeout(()=> {
                        // 部品描画
                        this.refreshParts()

                        // opacityを0から1に
                        imgs.css({opacity: 1})
                    }, 1000)
                }
            })
        }

        // Foldableコンポーネントのセットアップ
        window.M.Collapsible.init(document.querySelectorAll(".collapsible"), {})
        
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
            savedCondition = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY_GN125))

            if(!savedCondition["controll-panel-gn_fender-brightness"])
                savedCondition = defaultCondition
        }
        catch(e){
            savedCondition = defaultCondition
        }

        // 前回保存情報を画面にセット
        Object.keys(savedCondition || {})
            .forEach(key=> {
                $("#" + key).val(savedCondition[key])
            })
    },

    methods: {

        /**
         * パーツ画像の再描画
         */
        refreshParts: function(event){

            const imgWidth = $("#moto-images").width()

            this.adjustRatio = imgWidth / 1280;

            // 部品の色を変更して描画
            (this.partsImgList || [])
                .map(v=> {
                    return {
                        target: document.querySelector(`#controll-panel-${v.fileName}-hue-rotate`)
                    }
                })
                .forEach(v=> {

                    this.onSettingValueChange(v)

                })
        },

        /**
         * 設定値変更時のイベントハンドラ
         */
        onSettingValueChange: function(event){

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
            window.localStorage.setItem(LOCAL_STORAGE_KEY_GN125, JSON.stringify(currentCondition))

            alert("現在の設定を保存しました")
        },

        // /**
        //  * 編集結果画像をDL
        //  */
        // downloadImg: function(event){

        //     // オリジナルのbase画像
        //     const baseImg = document.getElementById("moto-image-gn125-front")

        //     const { width: w, naturalWidth: nw, naturalHeight: nh } = baseImg

        //     // 復元のための比率を算出
        //     const ar = nw / w

        //     const cvs = 
        //         $("<canvas>")
        //             .attr("width", nw)
        //             .attr("height", nh)

        //     // canvas contextを取得
        //     const ctx = cvs.get()[0].getContext("2d")


        //     // 主画像をcanvasに移しておく
        //     ctx.drawImage(baseImg, 0, 0, nw, nh)

        //     // 各部品画像をcanvasに描画する
        //     $(".moto-parts")
        //         .each((i, v)=> {
        //             const { offsetTop: v_top, offsetLeft: v_left, width: v_w, height: v_h } = v

        //             // cssフィルタをcanvasのフィルタにコピー(CSSと同じ形式なので)
        //             ctx.filter = v.style.filter

        //             // 比率を調整してcanvasに部品を描く
        //             ctx.drawImage(v, v_left * ar, v_top * ar, v_w * ar, v_h * ar)
        //         })


        //     $(event.target)
        //         .attr("href", cvs.get()[0].toDataURL("image/jpeg"))

        // }
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

#main-images-panel{
   position: relative;
}

#button-download{
   position: absolute;
   bottom: 8px;
   right: 8px;
   opacity: 0.8;
}

.moto-images{
   width: 100%;
}
.moto-images #moto-image-gn125-front{
   width: 100%;
   z-index: 1;
}
.moto-images .moto-parts{
   width: 100%;
   z-index: 5;
   opacity: 0;
   transition: opacity 0.3s;
}
.moto-images{
   position: relative;
}
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
#button-download{
   position: fixed;
   bottom: 8px;
   right: 8px;
   opacity: 1;
}

}
</style>
