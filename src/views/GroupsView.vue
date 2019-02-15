<template>
  <div class="groups-view">

    <div class="btn btn-filled"
      style="margin: 5px"
      v-if="canDelete"
      @click="deleteGroup">
      - Delete
    </div>

    <div class="btn btn-filled"
      style="margin: 5px"
      v-if="canDelete"
      @click="updateGroup">
      Update
    </div>

    <div class="group__image">
      <img src="../assets/_temp/GraphQL_Logo.svg.png" alt="">
      <div class="group__image__title">
        {{ group.name }}
      </div>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Description</div>
      {{ group.description }}
    </div>
    
    <div class="field-titled">
      <div class="field-titled__title">Topics</div>
        <div class="info-card"
          v-for="(item, index) in group.topic"
          :key="index">
          {{ item }} 
        </div>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Website</div>
      <li>
        <a :href="group.website">{{ group.website }}</a>
      </li>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Fields</div>
      <li v-for="(field, idx) in group.field"
        :key="idx">{{ field }}</li>
    </div>
    
    <div class="field-titled">
      <div class="field-titled__title">Universities</div>
      <li v-for="(university, idx) in group.university"
        :key="idx">{{ university }}</li>
    </div>

    <div class="field-titled" style="text-align: center">
      <div class="field-titled__title">Status</div>
      <div class="status"
        :class="{'status--active': group.status == 'active'
        , 'status--inactive': group.status == 'inactive'}">
        {{ group.status }}
      </div>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Skills</div>
      <li v-for="(skill, idx) in group.skill"
        :key="idx">{{ skill }}</li>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Members</div>
      <li v-for="(members, idx) in group.members"
        :key="idx">{{ members }}</li>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Leader</div>
      {{ leaderName }}
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Projects</div>

        <div class="box-centered wrapped-container">
          <div class="card-element"
            :key="index"
            v-for="(project, index) in projects">
            <b>{{ project.Titulo }}</b>
            {{ project.Descripcion }}
            leader: {{ project.Lider_de_proyecto.name }}
            status: {{ project.Status }}
          </div>
        </div>

    </div>

  </div>
</template>

<script>
import GQL, { DIR } from '../http_common'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      group: '',
      leaderName: '',
      projects: null
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentUser'
    ]),
    canDelete() {
      return localStorage.currentUser == this.group.leader
    }
  },
  methods: {
    async getGroupById(id) {
      const res = await GQL.post('',  {
        query: `
          query GroupByCode($code: String!) {
            groupByCode(code: $code) {
              name
              description
              topic
              website
              field
              logo
              university
              status
              skill
              members
              director
              leader
              project
              soid
            }
          }`,
          variables: {
            code: id
          }
        }
      )

      this.group = res.data.data.groupByCode
      console.log("Soid");
      console.log(this.group.soid);
      
      const res2 = await GQL.post('',  {
        query: `
          query Allprojects {
            allProjects {
              Status
              Miembros
              Lider_de_proyecto
              Titulo
              Areas_de_estudio
              Descripcion
            }
          }`
        }
      )
      
      console.log("PROJECTS");
      console.log(res2.data.data.allProjects);
      
      // this.projects = res2.data.data.allProjects.filter(p => p.Planeacion_Id == this.group.soid)
      this.projects = res2.data.data.allProjects.splice(0, 3)
      
    },
    async deleteGroup() {
      const res = await GQL.post('', {
        query: `
          mutation DeleteGroup($code: String!, $id: String!) {
            deleteGroup(code: $code, id: $id)
          }
        `,
        variables: {
          code: this.group.soid,
          id: this.getCurrentUser 
        }
      })

      console.log(res)      
      this.$router.push({name: 'Groups'})
    },
    updateGroup() {
      this.$router.push(`/groups/${this.$route.params.id}/update`)
    }
  },
  beforeMount() {
    const group_id = this.$route.params.id
    this.getGroupById(group_id)
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.groups-view
  padding: 0 30px
  padding-bottom: 50px

.group__image
  border-radius: 20px
  height: 300px
  max-width: 450px
  position: relative
  background: #FAF9FF
  box-shadow: 0 3px 15px 2px rgba(black, .15)

  .group__image__title
    position: absolute
    bottom: 10%
    left: -15px
    background: $color-purple
    padding: 10px 15px 
    color: white
    font-family: $font-bold
    border-radius: 30px
    font-size: 20px
    box-shadow: 0 1px 10px 2px rgba(black, .2)

  img 
    object-position: 50% 50%
    @extend %image-cover

.field-titled
  border-radius: 7px
  background: white
  max-width: 450px
  position: relative
  padding: 25px 20px 20px 
  margin-top: 45px

  .field-titled__title
    background: #f4f2ff
    border-radius: 4px
    box-shadow: 0 2px 3px 1px rgba($color-purple, .2)
    color: $color-purple
    font-family: $font-bold
    padding: 5px 10px
    font-size: 15px
    position: absolute
    top: 0%
    left: 50%
    transform: translate(-50%, -50%)

.wrapped-container
  flex-wrap: wrap

</style>
