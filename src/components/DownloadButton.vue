<template>
  <a
      id="button-download" 
      class="waves-effect waves-light btn"
      download="moto-img.png"
      v-on:click="downloadImg"
  >
          <i class="material-icons left">file_download</i>画像をDL(Chrome or Firefoxのみ)
  </a>
</template>

<script>

import $ from "jquery"

export default {
  name: 'DownloadButton',

  props: {
    selectorBaseImg: String,
    selectorPartsImg: String,
  },
  
  methods: {
    /**
     * 編集結果画像をDL
     */
    downloadImg: function(event){

        // オリジナルのbase画像
        //const baseImg = document.getElementById("moto-image-gn125-front")
        const baseImg = document.querySelector(this.selectorBaseImg)

        const { width: w, naturalWidth: nw, naturalHeight: nh } = baseImg

        // 復元のための比率を算出
        const ar = nw / w

        const cvs = 
            $("<canvas>")
                .attr("width", nw)
                .attr("height", nh)

        // canvas contextを取得
        const ctx = cvs.get()[0].getContext("2d")


        // 主画像をcanvasに移しておく
        ctx.drawImage(baseImg, 0, 0, nw, nh)

        // 各部品画像をcanvasに描画する
        //$(".moto-parts")
        $(this.selectorPartsImg)
            .each((i, v)=> {
                const { offsetTop: v_top, offsetLeft: v_left, width: v_w, height: v_h } = v

                // cssフィルタをcanvasのフィルタにコピー(CSSと同じ形式なので)
                ctx.filter = v.style.filter

                // 比率を調整してcanvasに部品を描く
                ctx.drawImage(v, v_left * ar, v_top * ar, v_w * ar, v_h * ar)
            })


        $(event.target)
            .attr("href", cvs.get()[0].toDataURL("image/jpeg"))

    }
  }
}
</script>

<style>
#button-download{
   position: absolute;
   bottom: 8px;
   right: 8px;
   opacity: 0.8;
   z-index: 300;
}

/*@media screen and (min-width:1024px) {*/
@media screen and (min-width:568px) {

#button-download{
   position: fixed;
   bottom: 8px;
   right: 8px;
   opacity: 1;
}

}
</style>
