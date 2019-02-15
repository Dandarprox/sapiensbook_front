<template>
  <div class="chat"
    :class="{'chat--small': isActive}">
    <div class="chat-min"
      @click="isActive = !isActive">
      <svg class="material-icon" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
    </div>

    <div class="title">Community chat</div>
    <div class="history" ref="history">
      <template
        v-for="(item, index) in history" >
        <div class="bubble bubble--left"
          v-if="item.user != getCurrentUser"
          :key="index">
          {{ item.message }}
          <div class="time">{{ item.date }}</div>
        </div>
        <div class="bubble bubble--right"
          v-else
          :key="index">
          {{ item.message }}
          <div class="time">{{ item.date }}</div>
        </div>
      </template>
    </div>

    <input type="text" class="ic" v-model="message"
      @keypress.enter="send">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {BaseIP} from '../http_common';
import * as io from 'socket.io-client';

const connectionOptions = {
  "force new connection": true,
  "reconnectionAttempsts": "Infinity",
  "transports": ["websocket"]
};

export default {
  data() {
    return {
      socket: io(`ws://${BaseIP}:8002`, connectionOptions),
      baseIp: BaseIP,
      // socket: io(`https://bright-moose-0.localtunnel.me`, connectionOptions),
      message: "",
      server: "",
      history: [],
      isActive: false
    }
  },
  mounted() {
    let scroll = this.$refs.history;
    
    this.socket.on('new-message', function (data) {
      this.history.push(data);

      this.$nextTick(function(){
        scroll.scrollTop = scroll.scrollHeight;
      });
    }.bind(this));
  },
  computed: {
    ...mapGetters(['getCurrentUser'])
  },
  methods: {
    send() {
      let date = new Date;
      let time = `${date.getHours()}:${date.getMinutes()}`;
      this.socket.emit('save-message', {message: this.message, date: time, user: this.getCurrentUser});
      this.message = "";
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../stylesheets/general.sass"

$chat-soft-blue: #fcfcff

.chat
  width: 350px
  height: 500px 
  position: fixed
  right: 30px
  bottom: 0 
  background: white
  box-shadow: 0px 2px 10px 3px rgba(black, 0.10)
  border-radius: 10px
  border: 1px solid rgba(black, 0.15)
  transition: 0.3s

input.ic
  position: absolute
  bottom: 35px
  right: 35px
  width: 70%
  height: 30px
  border-radius: 13px 
  background: white
  border-width: 0
  box-shadow: 1px 1px 10px 3px rgba(black, 0.13)
  padding: 0 10px

  &:focus
    outline: 0

.chat-min
  +squared(27px)
  border-radius: 50%
  position: absolute
  top: 15px
  right: 15px
  background: $color-purple
  @extend %pointer
  transition: 0.2s
  padding-top: 1px

  &:hover
    filter: brightness(130%)

  svg
    fill: white

.chat--small
  height: 57px

  .chat-min svg
    transform: rotate(180deg)

  input
    display: none

.history
  position: relative
  margin: 20px 15px 0
  height: 415px
  background: $chat-soft-blue
  box-shadow: inset 0 0 20px 1px rgba(black, 0.08)
  padding: 15px
  padding-bottom: 50px
  overflow-y: auto

.title
  margin-top: 18px
  margin-left: 25px
  color: $color-purple
  font-size: 21px
  font-family: $font-bold

.bubble
  position: relative
  margin: 20px 0
  max-width: 80%
  font-size: 14px
  padding: 15px 20px
  box-shadow: 1px 1px 8px 3px rgba(black, 0.1)

.time
  position: absolute
  color: $color-purple
  font-size: 10px
  bottom: -3px
  transform: translateY(100%)

.bubble--left
  color: rgba(black, 0.5)
  background: white
  border-top-right-radius: 15px
  border-top-left-radius: 15px
  border-bottom-left-radius: 3px
  border-bottom-right-radius: 15px

  .time
    right: 10px

.bubble--right
  color: white
  background: $color-purple
  margin-left: auto
  border-top-right-radius: 15px
  border-top-left-radius: 15px
  border-bottom-left-radius: 15px
  border-bottom-right-radius: 3px

  .time
    left: 10px

</style>
