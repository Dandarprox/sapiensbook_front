<template>
  <div class="top-bar">
    <div class="search-box"
      @click="activeSearch = true">
      <input type="text" class="search-bar" :class="{'search-bar--active': activeSearch}">
      <div class="icon">
        <svg class="material-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    </div>
    <div>
      <div class="btn-round">About us</div>
      <div class="btn-round" @click="logout">Log Out</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSearch: false
    }
  },
  methods: {
    logout() {
      console.log("Logout")
      this.$store.commit("setJwt", "");
      this.$router.push({name: 'Landing'});
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.top-bar
  +flex(0, 0)
  padding: 30px 20px
  justify-content: space-between

input.search-bar
  box-shadow: 0 3px 20px 3px rgba(black, .1)
  padding: 10px
  border-radius: 30px
  border: 0
  height: 43px
  max-width: 50px
  position: relative
  cursor: pointer
  transition: 1s
  padding-left: 45px

  &:focus
    outline: 0

.search-bar--active
  max-width: 500px !important
  cursor: normal

.search-box
  position: relative

  .icon
    position: absolute
    width: 25px
    height: 25px
    top: 43%
    left: 13px
    transform: translateY(-50%)

    svg
      fill: rgba(black, .5)




</style>
