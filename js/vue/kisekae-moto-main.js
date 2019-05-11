

/**
 * 部品定義
 */
const partsDef = [
    { name: "フェンダー", fileName: "gn_fender", top: 424, left: 282, width: 250},
    { name: "ヘッドライト", fileName: "gn_headlight", top: 128, left: 462, width: 128 },
    { name: "シート", fileName: "gn_sheet", top: 232, left: 796, width: 260 },
    { name: "サイドカバー", fileName: "gn_sidecover", top: 390, left: 800, width: 150 },
    { name: "タンク", fileName: "gn_tank", top: 194, left: 626, width: 200 },
]

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

/**
 * component登録
 */
Vue.component('kisekae-moto-main', {
    data: function () {
      return {
        partsImgList: partsDef,
        controllPanelSettings: controllPanelSrc,
        filePath: "img/gn125/parts/motobase-gn125-front-1/",
        adjustRatio: 1
      }
    },

    mounted: function(){

        // 画面リサイズ時に再描画を仕掛ける
        $(window).resize(()=> {

            this.refreshParts()
        })

        // setTimeout(()=> {
        //     // 部品画像をrefresh
        //     this.refreshParts()
        // }, 1)

        // 画像が全てロードされた後でないと、refreshしてもバグるので対策
        const imgs = $(".moto-parts, #moto-image-gn125-front")

        let count = 0

        imgs.on("load", (event)=> {
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
    },

    methods: {

        refreshParts: function(){

            this.adjustRatio = $("#moto-images").width() / 1280

            console.log(this.adjustRatio)

            // 部品の色を変更して描画
            this.partsImgList
                .map(v=> {
                    return {
                        target: document.querySelector(`#controll-panel-${v.fileName}-hue-rotate`)
                    }
                })
                .forEach(v=> {
                    this.onSettingValueChange(v)
                })
        },

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

        downloadImg: function(event){

            // オリジナルのbase画像
            const baseImg = document.getElementById("moto-image-gn125-front")

            const { width: w, height: h, naturalWidth: nw, naturalHeight: nh } = baseImg

            // 復元のための比率を算出
            const ar = nw / w

            const cvs = 
                $("<canvas>")
                    .attr("width", nw)
                    .attr("height", nh)

            //$("#mytest-res").append(cvs)

            // canvas contextを取得
            const ctx = cvs.get()[0].getContext("2d")


            // 主画像をcanvasに移しておく
            ctx.drawImage(baseImg, 0, 0, nw, nh)

            // 各部品画像をcanvasに描画する
            $(".moto-parts")
                .each((i, v)=> {
                    const { offsetTop: v_top, offsetLeft: v_left, width: v_w, height: v_h } = v

                    // cssフィルタをcanvasのフィルタにコピー(CSSと同じ形式なので)
                    ctx.filter = v.style.filter

                    // 比率を調整してcanvasに部品を描く
                    ctx.drawImage(v, v_left * ar, v_top * ar, v_w * ar, v_h * ar)
                })


            $(event.target)
                .attr("href", cvs.get()[0].toDataURL("image/jpeg"))



//             const context = document.getElementById("canvas").getContext("2d")

//             const px2num = (s)=> {
//                 return Number(s.replace("px", ""))
//             }

//             const baseImg = document.getElementById("moto-image-gn125-front")

//             context.drawImage(baseImg, 0, 0);

//             $(".moto-parts")
//                 .each((i, v)=> {

//                     const x = px2num(v.style.left)
//                     const y = px2num(v.style.top)                    
// console.log(x, y)
//                     context.drawImage(v, x, y);
//                 })
            


//             // htmlからcanvas生成
//             html2canvas(document.getElementById("app"), {
//                 onrendered: function(canvas){
                  
//                     let link = document.createElement("a")
//                     link.href = canvas.toDataURL("image/png")
//                     link.download = "moto-img.png"
//                     link.click()

//                 }
//             })

        }
    },
    // TODO: templateがtemplateリテラルなのはいかにもNG. .vueで単一ファイルコンポーネントにすること(要webpack)
    template: `
<div>
    <div id="main-images-panel">

        <div id="moto-images" class="moto-images">
            <img id="moto-image-gn125-front" src="img/gn125/base/motobase-gn125-front-1.jpg">                    

            <img
                class="moto-parts"
                v-for="partsImg in partsImgList" 
                v-bind:id="'moto-parts-' + partsImg.fileName"
                v-bind:src="filePath + partsImg.fileName + '.png'"
                v-bind:style="{ position: 'absolute', top: partsImg.top * adjustRatio + 'px', left: partsImg.left * adjustRatio + 'px', width: partsImg.width * adjustRatio + 'px'}"
            />
        </div>

        <a
            id="button-download" 
            class="waves-effect waves-light btn"
            download="moto-img.png"
            v-on:click="downloadImg"
        >
                <i class="material-icons left">file_download</i>画像をDL(Chrome or Firefoxのみ)
        </a>

    </div>

    <div id="controll-panel">
        <ul class="collapsible">
            <li v-for="parts in partsImgList">
                <div class="collapsible-header"><i class="material-icons">arrow_drop_down</i>{{parts.name}}</div>
                <div class="collapsible-body" v-bind:id="'controll-panel-' + parts.fileName + '-wrapper'">
                    <label class="controll-panel-label col s12 m3" v-for="settings in controllPanelSettings">
                        
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
            <a id="button-save-conditions" class="waves-effect waves-light btn"><i class="material-icons left">save</i>現在の設定を保存</a>
        </div>

    </div>

</div>
    `
  })