<template>
  <div class="modal">
    <div class="modal__base" v-if="isActive">
      <div class="modal__content">
        <div class="modal__close" @click="toggleModal()">
          <svg class="material-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </div>
        <slot></slot>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleModal() {
      this.isActive = !this.isActive;
      this.$emit("modalclose");
    }
  },
  mounted() {
    let self = this;
    document.onkeydown = function(event) {
      if(self.isActive && event.key == "Escape") {
        self.toggleModal();
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.modal__base
  position: fixed
  background: rgba(black, 0.5)
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  z-index: 10
  animation: fadeIn 0.5s

.modal__content
  position: absolute
  padding: 25px
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  background: white
  border-radius: 7px
  width: 80vw
  height: 80vh
  overflow-y: auto

.modal__close
  width: 30px
  height: 30px
  border-radius: 50%
  background: $color-purple
  margin: 0 0 30px auto
  padding: 5px
  transition: 0.3s
  cursor: pointer

  svg
    fill: white

  &:hover
    background: lighten($color-purple, 5%)

@media (max-width: 630px)
  .modal__content
    width: 90vw

</style>
