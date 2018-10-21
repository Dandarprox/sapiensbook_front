<template>
  <div class="layout">
    <div class="layout__lateral-panel">
      <lateral-panel></lateral-panel>
    </div>

    <div class="layout__main-content">
      <router-view></router-view>
    </div>
  </div>  
</template>

<script>
import LateralPanel from './LateralPanel.vue'

export default {
  components: {
    LateralPanel
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

</style>
