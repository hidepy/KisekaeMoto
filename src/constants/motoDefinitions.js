const defaultMainImgWidth = 1280

export default {
    REBEL250: {
        mainImgPath: "img/rebel250/base/rebel250.jpg",
        partsPath: "./img/rebel250/parts/",
        partsDef: [
            { name: "フェンダー", fileName: "fender_01", top: 0, left: 0, width: defaultMainImgWidth},
            { name: "リアフェンダー", fileName: "fender_02", top: 0, left: 0, width: defaultMainImgWidth},
            { name: "ヘッドライトカバー", fileName: "headlight", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンク", fileName: "tank", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "サイドカバー", fileName: "sidecover", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シート", fileName: "sheet_01", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シート(タンデム)", fileName: "sheet_02", top: 0, left: 0, width: defaultMainImgWidth },
        ]
    },
    REBEL250_2: {
        mainImgPath: "img/rebel250-2/base/rebel250-2.jpg",
        partsPath: "./img/rebel250-2/parts/",
        partsDef: [
            { name: "フェンダー", fileName: "fender", top: 0, left: 0, width: defaultMainImgWidth},
            { name: "ヘッドライトカバー", fileName: "headlight", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンク", fileName: "tank", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "サイドカバー", fileName: "sidecover_01", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "エンジンカバー", fileName: "sidecover_02", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "アンダーカウル", fileName: "cawl_01", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "テールカウル", fileName: "cawl_02", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シート", fileName: "sheet", top: 0, left: 0, width: defaultMainImgWidth },
        ]
    },
    YZFR25:{
        mainImgPath: "img/yzfr25/base/motobase-yzfr25-front-1.jpg",
        partsPath: "./img/yzfr25/parts/motobase-yzfr25-front-1/",
        partsDef: [
            { name: "フェンダー", fileName: "r25_fender", top: 0, left: 0, width: defaultMainImgWidth},
            { name: "ヘッドライトカウル", fileName: "r25_frontcowl", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シートカウル", fileName: "r25_rearcowl", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "サイドカウル(メイン)", fileName: "r25_sidecover_01", top: 0, left: 0, width: defaultMainImgWidth , "saturate": "0", brightness: "110"},
            { name: "サイドカウル(アクセント)", fileName: "r25_sidecover_02", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンク", fileName: "r25_tank", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "ホイール", fileName: "r25_wheel", top: 0, left: 0, width: defaultMainImgWidth },
        ]
    },
    DUKE390:{
        mainImgPath: "img/duke390/base/duke390-base.jpg",
        partsPath: "./img/duke390/parts/motobase-duke390-front-1/",
        partsDef: [
            //{ name: "フェンダー", fileName: "gladius400-front-fender", top: 0, left: 0, width: defaultMainImgWidth},
            { name: "ヘッドライトカバー", fileName: "duke390-headlight", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンクカバー", fileName: "duke390-tankcover", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンク文字色", fileName: "duke390-tank-typo", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シートカウル", fileName: "duke390-sheet-cowl", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "フレーム(メイン)", fileName: "duke390-frame-front", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "フレーム(リア)", fileName: "duke390-frame-rear", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "ホイール", fileName: "duke390-wheel", top: 0, left: 0, width: defaultMainImgWidth },
        ]
    },
    GN125:{
        mainImgPath: "img/gn125/base/motobase-gn125-front-1.jpg",
        partsPath: "./img/gn125/parts/motobase-gn125-front-1/",
        partsDef: [
            { name: "フェンダー", fileName: "gn_fender", top: 424, left: 282, width: 250},
            { name: "ヘッドライト", fileName: "gn_headlight", top: 128, left: 462, width: 128 },
            { name: "シート", fileName: "gn_sheet", top: 232, left: 796, width: 260 },
            { name: "サイドカバー", fileName: "gn_sidecover", top: 390, left: 800, width: 150 },
            { name: "タンク", fileName: "gn_tank", top: 194, left: 626, width: 200 },
            //{ name: "タンク", fileName: "gn_tank-fullsize", top: 0, left: 0, width: defaultMainImgWidth },
        ]
    },
    GN125cafe:{
        mainImgPath: "img/gn125cafe/base/gn125-base.jpg",
        partsPath: "./img/gn125cafe/parts/motobase-gn125cafe-front-1/",
        partsDef: [
            { name: "ヘッドライト", fileName: "gn125cafe-headlight", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンク", fileName: "gn125cafe-tank", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シート", fileName: "gn125cafe-sheet", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "サイドカバー", fileName: "gn125cafe-sidecover", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "ホイール", fileName: "gn125cafe-wheel", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "フォークアウターチューブ", fileName: "gn125cafe-fork-outer", top: 0, left: 0, width: defaultMainImgWidth},
            { name: "グリップ", fileName: "gn125cafe-grip", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "ミラー", fileName: "gn125cafe-mirror", top: 0, left: 0, width: defaultMainImgWidth },
        ]
    },
    GLADIUS400:{
        mainImgPath: "img/gladius400/base/gladius400-main.jpg",
        partsPath: "./img/gladius400/parts/motobase-gladius400-front-1/",
        partsDef: [
            { name: "フェンダー", fileName: "gladius400-front-fender", top: 0, left: 0, width: defaultMainImgWidth},
            { name: "ヘッドライトカバー", fileName: "gladius400-headlight-cover", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シュラウド", fileName: "gladius400-shroud", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンク", fileName: "gladius400-tank", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンクカバー1", fileName: "gladius400-tank-cover1", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "タンクカバー2", fileName: "gladius400-tank-cover2", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "サイドカバー1", fileName: "gladius400-sidecover1", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "サイドカバー2", fileName: "gladius400-sidecover2", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シート", fileName: "gladius400-sheet-main", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "シート(アクセント)", fileName: "gladius400-sheet-accent", top: 0, left: 0, width: defaultMainImgWidth },
            { name: "ホイール", fileName: "gladius400-wheel", top: 0, left: 0, width: defaultMainImgWidth },
        ]
    },

}