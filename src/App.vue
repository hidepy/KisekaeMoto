<template>
  <div id="app">
    
    <HeaderNav />

    <KisekaeMotoMain />

  </div>
</template>

<script>

import HeaderNav from './components/HeaderNav.vue'
import KisekaeMotoMain from './components/KisekaeMotoMain.vue'

export default {
  name: 'app',
  components: {
    HeaderNav,
    KisekaeMotoMain
  }
}
</script>

<style>
#app{
  font-family: "Noto Sans JP";
}
</style>
