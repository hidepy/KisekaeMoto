/**
 * 設定条件の保存のためのキー
 */
const LOCAL_STORAGE_KEY_GN125 = "LOCAL_STORAGE_KEY_GN125"

/**
 * Readyイベント
 */
$(document).ready(function(){

    // Vueのセットアップ
    new Vue({ el: '#app' })

    // 折りたたみ部品の生成
    M.Collapsible.init(document.querySelectorAll(".collapsible"), {})

    // 設定条件保存ボタン押下時イベントハンドラ
    $("#button-save-conditions").on("click", function(){

        // 現在のパラメータ状態
        const currentCondition = {}

        $(".controll-panel-input")
            .each((i, v)=> {
                currentCondition[$(v).attr("id")] = $(v).val()
            })

        // LocalStorageに保存
        window.localStorage.setItem(LOCAL_STORAGE_KEY_GN125, JSON.stringify(currentCondition))

    })

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

console.log(savedCondition)

    // 前回保存情報を画面にセット
    Object.keys(savedCondition || {})
        .forEach(key=> {
            $("#" + key).val(savedCondition[key])
        })

})