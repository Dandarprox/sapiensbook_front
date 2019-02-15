<template>
  <div class="me">
    <div class="profile-box">
      <div class="profile-picture">
        <img src="../assets/_temp/spenas.png" alt="">
      </div>
      <div class="profile-main">
        <h2>{{ user.name }} {{ user.lastname }}</h2>
        <span class="email">@{{ user.email }}</span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, nulla.
      </div>
    </div>
    <div class="my-data">
      <h1 style="text-align: center">Profile</h1>
      <div class="data-box">
        <div class="data-field">
          <h3>Organization</h3>
          {{ user.organization }}
        </div>

        <div class="data-field">
          <h3>Nationality</h3>
          {{ user.nacionality }}
        </div>

        <div class="data-field">
          <h3>Publications</h3>
          {{ user.publications }}
        </div>

        <div class="data-field">
          <h3>Skills</h3>
          <li v-for="(skill, index) in user.skills"
            :key="index">
            {{ skill }}
          </li>  
        </div>

        <div class="data-field">
          <h3>Languages</h3>
          <li v-for="(language, index) in user.languages"
            :key="index">
            {{ language }}
          </li>          
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import GQL from '../http_common'

export default {
  data() {
    return {
      user: ''
    }
  },
  methods: {
    async getUserInfo() {
      const res = await GQL.post('', {
        query: `
          query UserMe($token: String!) {
            me(token: $token) {
              name
              lastname
              email
              organization
              skills
              languages
            }
          }`,
        variables: {
          token: localStorage.token
        }
      })
      this.user = res.data.data.me;
    }
  },
  beforeMount() {
    this.getUserInfo()
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.me
  padding: 0 20px

.profile-box
  +flex(0, 0)

.profile-picture
  border-radius: 50%
  width: 140px
  height: 140px
  margin: 0 20px

  img
    border-radius: 50%
    @extend %image-cover

.profile-main
  max-width: 350px
  white-space: pre-line
  color: $color-softBlack

.email
  color: rgba(black, .03)
  font-weight: bolder

.my-data
  border-radius: 20px
  margin: 30px auto
  width: 97%
  background: rgba(white, .8)
  box-shadow: 1px 3px 15px  rgba(black, .07)
  height: 400px
  max-height: 500px
  overflow-y: auto
  padding: 20px 30px

  .data-box
    +flex(0, 0)
    flex-wrap: wrap


  .data-field
    width: 250px
    padding: 10px 25px
    border-radius: 4px
    margin: 15px
    border: 1px solid rgba(black, .05)
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(120, 110, 153, .07) 100%)

</style>
