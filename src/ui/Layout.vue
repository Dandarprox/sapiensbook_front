<template>
  <div class="layout">
    <div class="layout__lateral-panel">
      <lateral-panel></lateral-panel>
    </div>

    <div class="layout__main-content">
      <top-bar></top-bar>
      <router-view></router-view>
    </div>
  </div>  
</template>

<script>
import LateralPanel from './LateralPanel.vue'
import TopBar from './TopBar.vue'

export default {
  components: {
    LateralPanel,
    TopBar
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.layout
  +flex(0, 0)
  height: 100vh

  .layout__lateral-panel

  .layout__main-content
    background: #f0eff4
    flex-grow: 1
    overflow-y: auto

</style>
