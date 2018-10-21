<template>
  <div class="panel">
    <div class="title">Sapiensbook</div>
    <div class="profile">
      <div class="profile__image">
        <img src="../assets/_temp/spenas.png" alt="">
      </div>
      <div class="profile__data">
        <strong>Santiago Peña</strong>
        @spenas
      </div>
    </div>
    <div class="profile__meta">
      <span>
        <strong>130</strong> Following
      </span>
      <span>
        <strong>5k</strong> Followers
      </span>
      <span>
        <strong>3</strong> Projects
      </span>
    </div>

    <div class="menu">
      <li class="menu--active">
        <routerLink>
          <div class="icon">
            <svg class="material-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
          </div>
          Grupos 
        </routerLink>
      </li>
      <li>
        <routerLink>
          <div class="icon">
            <svg class="material-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
          </div>
          Actividad
        </routerLink>
      </li>
      <li>
        <routerLink>
          <div class="icon">
            <svg class="material-icon" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
          </div>
          Perfil
        </routerLink>
      </li>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.panel
  +flex(0, 1)
  flex-direction: column
  width: 280px
  height: 100%
  border-right: 2px solid rgba(black, .065)
  color: lighten(black, 60%)
  font-size: 15px

.title
  @extend %title
  font-size: 24px
  color: #564C74
  padding: 25px 0

.profile
  +flex(1, 1)

  .profile__image
    width: 40px
    height: 40px
    border-radius: 50%
    margin: 5px 15px

    img
      border-radius: 50%
      @extend %image-cover

  .profile__data
    color: #CFD0E7
    white-space: pre-line
    
strong
  color: #564C74

.profile__meta 
  +flex(1, 1)
  flex-wrap: wrap
  padding: 0 15px
  span
    padding: 5px 15px

.menu
  +flex(1, 1)
  margin-top: 25px
  @extend %title 
  color: #564C74
  flex-direction: column
  width: 100%
  box-sizing: border-box

  li
    box-sizing: border-box
    list-style: none
    padding: 25px 
    border-left: 7px solid transparent
    width: 100%
    transition: .3s
    cursor: pointer
    
    > *
      +flex(0, 1)
      position: relative
      transform: translateX(27%)

    .icon
      margin-right: 20px
      width: 25px
      height: 25px

      svg
        fill: #BFC3DF

    &:hover
      border-left: 7px solid #564C74 
      background: #F2F2FF

li.menu--active
  border-left: 7px solid #564C74
  background: #F2F2FF

  .icon > svg
    fill: #564C74
    filter: drop-shadow(0 1px 2px rgba(#564C74, .7))

</style>
