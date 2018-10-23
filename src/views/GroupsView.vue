<template>
  <div class="groups-view">
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
      {{ group.leader }}
    </div>

    <div class="field-titled">
      <div class="field-titled__title">Projects</div>
      <li v-for="(project, idx) in group.project"
        :key="idx">{{ project }}</li>
    </div>

  </div>
</template>

<script>
import GQL from '../http_common'

export default {
  data() {
    return {
      group: ''
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

</style>
