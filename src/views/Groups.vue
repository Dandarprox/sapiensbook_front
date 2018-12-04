<template>
  <div class="groups">

    <tabs
      :tabs="tabs">

      <div slot="Groups" class="box-fluid">
        <div class="group-card"
          v-for="(item, index) in groups.allGroups"
          :key="index">

          <div class="group-card__in" @click="toRoute(item.soid)">
            <svg class="material-icon" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
          </div>

          <h2>{{ item.name }}</h2>
          <div class="group-card__image">
            <img src="../assets/_temp/GraphQL_Logo.svg.png" alt="">
          </div>
          <div class="group-card__content">
            <strong>Leader:</strong> {{item.leader}}

          </div>
          <div class="group-card__projects">
            <strong>Projects</strong>
            <ol>
              <li v-for="(project, index) in item.project" :key="index">
                {{ project }}
              </li>
            </ol>
          </div>
          <div class="group-card__themes">
            <div class="info-card"
              v-for="(topic, index) in item.topic"
              :key="index">{{ topic }}</div>
          </div>
        </div>
      </div>

      <div slot="My groups">
        <router-link
        tag="div"
        class="btn btn-filled"
        :to="{name: 'GroupsNew'}">+Create group</router-link>
     
        <div slot="Groups" class="box-fluid">
          <div class="group-card"
            v-for="(item, index) in myGroups"
            :key="index">

            <div class="group-card__in" @click="toRoute(item.soid)">
              <svg class="material-icon" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            </div>

            <h2>{{ item.name }}</h2>
            <div class="group-card__image">
              <img src="../assets/_temp/GraphQL_Logo.svg.png" alt="">
            </div>
            <div class="group-card__content">
              <strong>Leader:</strong> {{item.leader}}

            </div>
            <div class="group-card__projects">
              <strong>Projects</strong>
              <ol>
                <li v-for="(project, index) in item.project" :key="index">
                  {{ project }}
                </li>
              </ol>
            </div>
            <div class="group-card__themes">
              <div class="info-card"
                v-for="(topic, index) in item.topic"
                :key="index">{{ topic }}</div>
            </div>
          </div>
        </div>
      </div>
      
    </tabs>
  </div>  
</template>

<script>
import Tabs from '../ui/Tabs.vue'
import GQL from '../http_common'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  components: {
    Tabs
  },
  data() {
    return {
      groups: '',
      myGroups: '',
      test: '',
      mutation: '',
      tabs: [
        'Groups',
        'My groups'
      ]
    }
  },
  methods: {
    toRoute(id) {
      console.log("ID: ", id);

      this.$router.push({
        name: 'GroupsView',
        params: {
          id: id
        }
      })
    },
    async getAllGroups() {
      const res = await GQL.post('', {
        query: `{
          allGroups {
            name
            leader
            project
            topic
            soid
          }
        }`
      })

      this.groups = res.data.data
    },
    async createUser() {

      try {
        const res = await GQL.post('', {
          query: `
          mutation CreateUser($user: UserInput!) {
            createUser(user: $user) {
              _id
              name
            }
          }`,
          variables: {
            user: {
              name: 'Daniel',
              lastname: 'Rod',
              email: 'spenas@unal.com',
              password: 'ASDasda123',
              languages: ['Spanish'],
              skills: ['Rien']
            }
          }
        })
  
        this.mutation = res.data
      }
      catch(e) {
        console.error("Error:", e)
      }
    },
  },
  computed: {
    ...mapGetters([
      'getCurrentUser'
    ])
  },
  async mounted() {
    await this.getAllGroups()
    let self = this
    this.myGroups = _.filter(this.groups.allGroups, function(group) {
      console.log(group)
      if(group.leader == self.getCurrentUser) return true;
      return false;
    })
  }
}

</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.group-card
  +flex(0, 1)
  flex-direction: column
  border-radius: 7px
  background: white
  width: 250px
  padding: 20px 10px 10px
  margin: 15px
  font-size: 16px
  position: relative

  strong
    color: $color-purple

  .group-card__image
    width: 120px
    height: 120px
    margin: 0 0 10px 
    border-radius: 15px
    box-shadow: inset 0 2px 10px 2px rgba(black, .13)

    img
      @extend %image-cover

  .group-card__content
    width: 80%
    white-space: pre-line
    text-align: left

  .group-card__themes
    border: 1px dashed rgba(black, .2)
    border-radius: 4px

  .group-card__projects
    text-align: left 
    width: 80% 

.group-card__in
  position: absolute
  width: 25px
  height: 25px
  top: 10px
  right: 10px
  border-radius: 50%
  background: $golden
  border: 2px solid $golden
  padding: 2px
  cursor: pointer
  transition: .3s

  svg
    fill: white

  &:hover
    box-shadow: 0 1px 3px 1px rgba(black, .17)
    

</style>
