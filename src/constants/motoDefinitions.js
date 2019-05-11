const defaultMainImgWidth = 1280

export default {
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
    }
}