<template>
  <div class="user-list" ref="list">
    <div class="wrapper">
      <div class="row" style="position: relative">
        <div class="badge">
          <svg class="material-icon" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
          </svg>
        </div>
        <input type="text" class="selector" ref="droplist" v-model="search">
      </div>

      <div class="row" 
        v-for="(user, index) in currentUsers" 
        :key="`${user.name}-${user._id}`">
        <div class="badge">
          <svg class="material-icon" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            ></path>
          </svg>
        </div>

        <div class="selector">
          <b>{{ user.name }}</b>
        </div>

       <div class="btn-tiny"
        @click="removeUser(index)">
        <svg class="material-icon" viewBox="0 0 24 24">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </svg>
        </div>
      </div>
    </div>

    <div class="drop-list" v-show="dropListActive">
      <div class="close-btn" @click="dropListActive = false">
        <svg class="material-icon" viewBox="0 0 24 24">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
        </svg>
      </div>

      <div class="row" 
        v-for="user in query" 
        :key="`${user.name}-${user._id}`" 
        @click="addUser(user); dropListActive = false">
        <div class="badge">
          <svg class="material-icon" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
            ></path>
          </svg>
        </div>

        <div class="selector">
          <b>{{ user.name }}</b>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import GQL from "../http_common";

export default {
  props: {
    unique: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dropListActive: false,
      users: [],
      currentUsers: [],
      search: ""
    };
  },
  mounted() {
    this.fetchUsers();
    this.$refs.droplist.addEventListener("focus", () => {
      this.dropListActive = true;
    });

    this.currentUsers = this.value;
  },
  methods: {
    async fetchUsers() {
      try {
        const res = await GQL.post("", {
          query: `
            query AllUsers {
              allUsers {
                name
                _id
              }
            }`
        });

        this.users = res.data.data.allUsers;
      } catch (e) {
        console.error("Error> ", e);
      }
    },
    addUser(user) {
      if(this.unique && this.currentUsers.length > 0) return;

      for(const u of this.currentUsers) {
        if(u._id == user._id) return;
      }

      this.currentUsers.push(user);
    },
    removeUser(index) {
      this.currentUsers.splice(index, 1);
    }
  },
  computed: {
    query() {
      return this.users.filter((item) => {
        return item.name.toLocaleLowerCase().includes(this.search);
      });
    }
  },
  watch: {
    currentUsers() {
      this.$emit("value:update", this.currentUsers);
    },
    value() {
      this.currentUsers = this.value;
    }
  }
};
</script>

<style lang="sass" scoped>
@import '../stylesheets/general.sass'

.user-list
  padding: 5px
  border-radius: 5px
  background: #fcfcff
  border: 2px solid rgba(120, 110, 153, 0.2)
  max-height: 350px 
  position: relative

.row
  +flex(0, 1)
  padding: 10px
  transition: 0.2s

.selector
  width: 230px
  border-radius: 7px
  white-space: pre-line
  outline: 0
  padding: 5px
  border: 1px solid rgba(black, 0.2)
  font-size: 12px

.badge
  +flex(1, 1)
  +squared(27px)
  margin: 0 5px
  padding: 5px
  cursor: pointer
  background: #dadaf2
  border-radius: 7px
  border: 1px solid darken(#dadaf2, 10%)
  transition: 0.2s

  &:hover
    transform: scale(1.07)

  svg
    fill: white
    +squared(20px)

.drop-list
  padding: 15px 0
  width: calc(100% + 10px)
  height: 200px
  overflow-y: scroll
  top: 53px
  position: absolute
  background: white
  border-radius: 5px
  box-shadow: 0 2px 5px 2px rgba(black, 0.2)
  animation: fadeIn 500ms forwards
  z-index: 10

  .row:hover
    cursor: pointer
    background: lighten($color-purple, 54%)

.wrapper
  overflow-y: auto

.close-btn, .btn-tiny
  +squared(17px)
  margin: 0px 7px 5px auto
  border-radius: 50%
  padding: 1px
  background: lighten($color-purple, 40%)
  cursor: pointer
  transition: 0.3s

  &:hover
    background: lighten($color-purple, 50%)

  svg
    fill: $color-purple

.btn-tiny
  margin: 3px

@keyframes fadeIn
  from
    opacity: 0
  to
    opacity: 1

</style>
