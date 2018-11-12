<template>
  <div class="list">
    
    <div style="display: flex"
      v-for="(item, index) in alt"
      :key="index">
      <input 
        type="text" 
        class="input"
        v-model="alt[index]" @keypress.enter="addField">
      
      <div class="btn btn--icon-circle btn--purple-border"
        @click="removeField(index)">
        <svg class="material-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </div>
    </div>

  </div>  
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      alt: []
    }
  },
  watch: {
    alt: {
      handler() {
        this.$emit("value:update", this.alt)
      },
      deep: true
    },
    value: {
      handler() {
        this.alt = this.value
      },
      deep: true
    }
  },
  beforeMount() {
    this.alt = this.value
  },
  methods: {
    addField() {
      this.alt.push('')
    },
    removeField(index) {
      if(this.alt.length > 1)
        this.alt.splice(index, 1)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.list
  > div 
    margin: 3px 0

</style>
