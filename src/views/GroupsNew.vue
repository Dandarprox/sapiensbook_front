<template>
  <div class="groups-view">
    <div class="group__image">
      <img src="../assets/_temp/GraphQL_Logo.svg.png" alt="">
      <div class="group__image__title">
        {{ newGroup.name }}
      </div>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Title</div>
        <input 
          type="text" 
          class="input"
          v-model="newGroup.name">
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Description</div>
        <input 
          type="text" 
          class="input"
          v-model="newGroup.description">
    </div>
    
    <div class="field-titled">
      <div class="field-titled__title">Topics</div>
        <create-list
          :value.sync="newGroup.topic">
        </create-list>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Website</div>
        <input 
          type="text" 
          class="input"
          v-model="newGroup.website">
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Fields</div>
        <create-list
          :value.sync="newGroup.field">
        </create-list>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Universities</div>
        <create-list
          :value.sync="newGroup.university">
        </create-list>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Status</div>
      <input 
        type="text" 
        class="input"
        v-model="newGroup.status">
    </div>
    
    <div class="field-titled">
      <div class="field-titled__title">Skills</div>
       <create-list
          :value.sync="newGroup.skill">
        </create-list>
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Members</div>
       <create-list
          :value.sync="newGroup.members">
        </create-list>
    </div>
    
    <div class="field-titled">
      <div class="field-titled__title">Director</div>
      <input 
        type="text" 
        class="input"
        v-model="newGroup.director">
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Leader</div>
      <input 
        type="text" 
        class="input"
        v-model="newGroup.leader">
    </div>

    <!-- <div class="field-titled">
      <div class="field-titled__title">Projects</div>
      <create-list
        :value.sync="newGroup.project">
      </create-list>
    </div> -->

    <div class="btn btn-filled btn-margin"
      @click="createGroup">
      +Create
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
      'getJwt'
    ])
  },
  data() {
    return {
      newGroup: {
        name: 'abc',
        description: 'asd',
        topic: ['asd'],
        website: 'asd',
        field: ['asd'],
        logo: '',
        university: ['asd'],
        status: 'asd',
        skill: ['asd'],
        members: ['asd'],
        director: 'asd',
        leader: 'asd',
        project: [''],
      }
      // newGroup: {
      //   name: '',
      //   description: '',
      //   topic: '',
      //   website: '',
      //   field: [''],
      //   logo: '',
      //   university: [''],
      //   status: '',
      //   skill: [''],
      //   members: [''],
      //   director: '',
      //   leader: '',
      //   project: [''],
      // }
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
            }
          }`,
          variables: {
            code: id
          }
        }
      )
      
      this.group = res.data.data.groupByCode
    }
  },
  beforeMount() {
    const userId = jwt.decode(this.getJwt)._id
    this.newGroup.leader = userId
  },
  methods: {
    async createGroup() {

      const res = await GQL.post('', {
        query: `
          mutation CreateGroup($group: GroupInput!, $token: String!) {
            createGroup(group: $group, token: $token) {
              name
            }
          }`,
        variables: {
          group: this.newGroup,
          token: this.getJwt
        }
      })

      console.log(jwt.decode(this.getJwt))
      console.log(res)
      // this.$router.push({name: 'Groups'})
    }
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
