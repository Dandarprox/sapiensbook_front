<template>
  <div class="project">
    <h1 class="title-card">Add a new project</h1>

    <div class="row">
      <label for>Status</label>
      <div class="fl">
        <div class="xstatus xstatus--active"
          :class="{'xstatus--selected': project_fields.status == 'active'}"
          @click="project_fields.status = 'active'">Active</div>
        <div class="xstatus xstatus--inactive"
          :class="{'xstatus--selected': project_fields.status == 'inactive'}"
          @click="project_fields.status = 'inactive'">Inactive</div>
      </div>
    </div>

    <div class="row">
      <label for>Members</label>
      <user-list 
        :value="project_fields.members"></user-list>
    </div>

    <div class="row">
      <label for>Project leader</label>
      <user-list 
        :value="project_fields.project_leader"
        :unique="true"></user-list>
    </div>

    <div class="row">
      <label for>Title</label>
      <input type="text" class="input" v-model="project_fields.title">
    </div>

    <div class="row">
      <label for>Study areas</label>
      <input type="text" class="input" v-model="project_fields.study_areas">
    </div>

    <div class="row">
      <label for>Description</label>
      <input type="text" class="input" v-model="project_fields.description">
    </div>
  </div>
</template>

<script>
import UserList from '../components/UserList.vue'

export default {
  data() {
    return {
      project_fields: {
        status: "active",
        members: [],
        project_leader: [],
        title: "",
        study_areas: "",
        description: ""
      }
    };
  },
  components: {
    UserList
  }
};
</script>

<style lang="sass" scoped>
@import "../stylesheets/general.sass"
.title-card
  @extend %soft-shadow

input
  max-width: 350px

label
  width: 110px
  text-align: center
  font-size: 13px
  padding: 5px 10px
  border-radius: 3px
  color: white
  background-color: $color-purple
  margin: 0 5px

.row
  +flex(0, 0)
  margin-bottom: 15px

.fl
  +flex(1, 1)

.xstatus
  cursor: pointer
  margin: 0 10px
  padding: 5px 10px
  color: white
  font-size: 12px
  font-weight: bold
  border-radius: 5px
  border: 0
  transition: 0.3s
  box-shadow: 0 1px 5px 1px rgba(black, 0.15)

  &:hover
    filter: brightness(110%)

.xstatus--active
  background: #40a550

.xstatus--inactive
  background: #cc4343

.xstatus--selected
  transform: scale(1.23)

</style>