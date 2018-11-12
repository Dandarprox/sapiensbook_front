<template>
  <div class="groups-view">
    <div class="group__image">
      <img src="../assets/_temp/GraphQL_Logo.svg.png" alt="">
      <div class="group__image__title">
        {{ group.name }}
      </div>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Title</div>
        <input 
          type="text" 
          class="input"
          v-model="group.name">
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Description</div>
        <input 
          type="text" 
          class="input"
          v-model="group.description">
    </div>
    
    <div class="field-titled">
      <div class="field-titled__title">Topic</div>
        <create-list
          :value="group.topic">
        </create-list>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Fields</div>
        <create-list
          :value="group.field">
        </create-list>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Universities</div>
        <create-list
          :value.sync="group.university">
        </create-list>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Status</div>
      <input 
        type="text" 
        class="input"
        v-model="group.status">
    </div>
    
    <div class="field-titled">
      <div class="field-titled__title">Skills</div>
       <create-list
          :value.sync="group.skill">
        </create-list>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Members</div>
       <create-list
          :value.sync="group.members">
        </create-list>
    </div>
    
    <div class="field-titled">
      <div class="field-titled__title">Director</div>
      <input 
        type="text" 
        class="input"
        v-model="group.director">
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Leader</div>
      <input 
        disabled
        type="text" 
        class="input"
        v-model="group.leader">
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Projects</div>
      <create-list
        :value.sync="group.project">
      </create-list>
    </div>

    <div class="btn btn-filled btn-margin"
      @click="updateGroup()">
      +Update
    </div>

  </div>
</template>

<script>
import GQL from '../http_common'
import jwt from 'jsonwebtoken'
import { mapGetters } from 'vuex'
import CreateList from '../components/CreateList.vue'

export default {
  computed: {
    ...mapGetters([
      'getJwt',
      'getCurrentUser'
    ])
  },
  data() {
    return {
      group: {
        name: '',
        description: '',
        topic: [],
        website: '',
        field: [''],
        logo: '',
        university: [''],
        status: '',
        skill: [''],
        members: [''],
        director: '',
        leader: '',
        project: [''],
      },
      group_id: ''
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
      this.group_id = this.group.soid
    },
    async updateGroup() {
      delete this.group.soid
      const res = await GQL.post('', {
        query: `
          mutation UpdateGroup($code: String!, $group: GroupInput!, $token: String!) {
            updateGroup(code: $code, group: $group, token: $token) {
              name
            }
          }`,
          variables: {
            code: this.group_id,
            group: this.group,
            token: this.getJwt,
          }
      })

      this.$router.push({name: 'GroupsView', params: {id: this.group_id}})
    }
  },
  beforeMount() {
    const group_id = this.$route.params.id
    this.getGroupById(group_id)
  },
  components: {
    CreateList
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.btn-margin
  margin: 15px 0

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

</style>
