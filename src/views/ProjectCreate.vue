<template>
  <div class="project">
    <h1 class="Titulo-card">Add a new project</h1>

    <div class="row">
      <label for>Status</label>
      <div class="fl">
        <div class="xStatus xStatus--active"
          :class="{'xStatus--selected': project_fields.Status == 'active'}"
          @click="project_fields.Status = 'active'">Active</div>
        <div class="xStatus xStatus--inactive"
          :class="{'xStatus--selected': project_fields.Status == 'inactive'}"
          @click="project_fields.Status = 'inactive'">Inactive</div>
      </div>
    </div>

    <div class="row">
      <label for>Members</label>
      <user-list 
        :value="project_fields.Miembros"></user-list>
    </div>

    <div class="row">
      <label for>Project leader</label>
      <user-list 
        :value="project_fields.Lider_de_proyecto"
        :unique="true"></user-list>
    </div>

    <div class="row">
      <label for>Title</label>
      <input type="text" class="input" v-model="project_fields.Titulo">
    </div>

    <div class="row">
      <label for>Study areas</label>
      <input type="text" class="input" v-model="project_fields.Areas_de_estudio">
    </div>

    <div class="row">
      <label for>Description</label>
      <input type="text" class="input" v-model="project_fields.Descripcion">
    </div>

    <div class="btn btn-filled btn-margin"
      @click="sendData">
      +Create
    </div>
  </div>
</template>

<script>
import UserList from '../components/UserList.vue'
import { log } from 'async';

export default {
  data() {
    return {
      project_fields: {
        Status: "active",
        Miembros: [],
        Lider_de_proyecto: [],
        Titulo: "",
        Areas_de_estudio: "",
        Descripcion: ""
      }
    };
  },
  computed: {
  
  },
  components: {
    UserList
  },
  methods: {
    sendData() {
      // this.$store.commit('setCurrentProject', this.project_fields);
      this.project_fields.Lider_de_proyecto = this.project_fields.Lider_de_proyecto[0]
      this.project_fields.Areas_de_estudio = [this.project_fields.Areas_de_estudio]
      console.log("Sending to group");
      console.log(this.project_fields)
      this.$store.state.user.currentProject.push(this.project_fields);
      this.$emit('projectCreated');
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../stylesheets/general.sass"
.Titulo-card
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

.xStatus
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

.xStatus--active
  background: #40a550

.xStatus--inactive
  background: #cc4343

.xStatus--selected
  transform: scale(1.23)


</style>