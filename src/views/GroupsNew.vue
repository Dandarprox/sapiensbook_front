<template>
  <div class="groups-view">
    <modal ref="modalComponent">
      <keep-alive>
        <project-create
          @projectCreated="closeModal"></project-create>
      </keep-alive>
    </modal>

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

    <div class="field-titled">
      <div class="field-titled__title">Projects</div>

      <div class="box-centered wrapped-container">
        <div class="card-element"
          :key="index"
          v-for="(project, index) in currentProject">
          <div class="card-delete"
            @click="deleteCard(index)">x</div>
          <b>{{ project.Titulo }}</b>
          {{ project.Descripcion }}
          leader: {{ project.Lider_de_proyecto.name }}
          status: {{ project.Status }}
        </div>

        <div class="add-card-element" @click="activateModal">
          <div class="icon">  
            <svg class="material-icon" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="btn btn-filled btn-margin"
      @click="createGroup">
      +Create
    </div>

  </div>
</template>

<script>
import GQL from "../http_common";
import jwt from "jsonwebtoken";
import { mapGetters } from "vuex";
import CreateList from "../components/CreateList.vue";
import Modal from "../components/Modal.vue"
import { log } from "async";

import ProjectCreate from "./ProjectCreate.vue"

const projectFields = {
  status: "",
  members: [],
  project_leader: "",
  title: "",
  study_areas: [],
  description: ""
}

export default {
  computed: {
    ...mapGetters(["getJwt"]),
    ...mapGetters({
      "currentProject": "getCurrentProject"
    })
  },
  data() {
    return {
      local_project: {},
      newGroup: {
        name: "abc",
        description: "asd",
        topic: ["asd"],
        website: "asd",
        field: ["asd"],
        logo: "",
        university: ["asd"],
        status: "asd",
        skill: ["asd"],
        members: ["asd"],
        director: "asd",
        leader: "watas",
        project: [""]
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
    };
  },
  methods: {
    async getGroupById(id) {
      try {
        const res = await GQL.post("", {
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
        });

        this.group = res.data.data.groupByCode;
      } catch (e) {
        console.error("Error getting group by id");
      }
    },
    addProject() {
      this.projects.push(projectFields);
    },
    removeProject() {
      if(this.projects.length > 0)
        this.projects.pop();
    },
    setProject(params) {
      this.local_project = params;
    },
    closeModal() {
      this.$refs.modalComponent.toggleModal();
    },
    async createGroup() {
      try {
        const res = await GQL.post("", {
          query: `
            mutation CreateGroup($group: GroupInput!, $token: String!) {
              createGroup(group: $group, token: $token) {
                soid
              }
            }`,
          variables: {
            group: this.newGroup,
            token: localStorage.token
          }
        });

        await this.createProjects(res.data.data.createGroup.soid);
      } catch (e) {
        console.error("Error creating group");
      }

      this.$router.push({name: 'Groups'})
    },
    async createProjects(groupId) {
      try {
        
        let projects = this.$store.state.user.currentProject;
        for(const project of projects) {
          project.Lider_de_proyecto = project.Lider_de_proyecto._id

          for (let i = 0; i < project.Miembros.length; i++) {
            project.Miembros[i] = project.Miembros[i]._id            
          }

          console.log("Group id:", groupId);
          project.Planeacion_Id = [groupId];

          let res = await GQL.post("", {
            query: `
              mutation CreateProject($project: ProjectInput!, $token: String!) {
                createProject(project: $project, token: $token) {
                  Titulo
                }
              }`,
            variables: {
              project: project,
              token: localStorage.token
            }
          });
        }

        this.$store.state.user.currentProject = [];

      } catch (e) {
        console.error("Error creating project");
      }
    },
    activateModal() {
      this.$refs.modalComponent.toggleModal();
    },
    deleteCard(idx) {
      this.$store.state.user.currentProject.splice(idx, 1);
    }
  },
  beforeMount() {
    // const userId = jwt.decode(this.getJwt)._id;
    // this.newGroup.leader = userId;
  },
  components: {
    CreateList,
    Modal,
    ProjectCreate
  }
};
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

.card-delete
  +flex(1, 1)
  border-radius: 50%
  +squared(20px)
  background: #f44242
  color: white
  position: absolute
  top: 5px
  right: 5px
  line-height: 20px
  @extend %pointer

  &:hover
    filter: brightness(110%)

.wrapped-container
  flex-wrap: wrap

</style>