<template>
  <div class="tabs">

    <div class="tab-title">
      <div class="tab-title__item"
        v-for="(item, index) in tabs"
        :key="index"
        :class="{'tab-title__item--active': activeTab == index}"
        @click="activeTab = index">
          {{ item }}
      </div>
    </div>

    <div class="tab__content">
      <span 
        v-for="(item, idx) in tabs"
        :key="idx"
        v-show="activeTab == idx">
          <slot :name="item"></slot>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.tabs
  text-align: center

.tab-title
  display: inline-block
  border-radius: 7px
  overflow-x: auto
  background: white
  padding: 0 20px
  box-shadow: 0 2px 10px 1px rgba(black, .1)
  font-size: 15px
  height: 40px

.tab-title__item
  display: inline-block
  padding: 10px 20px
  text-align: center
  color: $color-purple
  border-bottom: 4px solid transparent
  transition: .3s
  cursor: pointer
  color: lighten(black, 50%)

  &:first-child
    border-topleft: 1px solid rgba(black, .2)

.tab-title__item--active
  border-bottom: 4px solid $color-purple
  color: black

.tab__content
  padding: 30px
  margin: 15px auto
  width: 90%
  border-bottom-left-radius: 10px
  border-bottom-right-radius: 10px
  height: 500px
  overflow-y: auto

</style>
