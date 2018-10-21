<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
@import './stylesheets/_variables.sass'

@font-face
  font-family: 'proxima-regular'
  src: url('./assets/fonts/proxima_nova/pn-regular.ttf')

@font-face
  font-family: 'proxima-bold'
  src: url('./assets/fonts/proxima_nova/pn-bold.ttf')

@font-face
  font-family: 'proxima-light'
  src: url('./assets/fonts/proxima_nova/pn-thin.ttf')

html, body
  margin: 0
  padding: 0
  font-family: $font-regular

*
  box-sizing: border-box

</style>
