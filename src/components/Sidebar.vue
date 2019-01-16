<template>
    <div class="sidebar">
        <md-button @click="sendPing()">Ping</md-button>
        <p v-if="pong">PONG!</p>
    </div>
</template>

<script>
import api from './resource/api.js'

export default {
  name: 'Sidebar',
  data: function () {
    return {
      pong: false
    }
  },
  methods: {
    sendPing: function () {
      this.$http.get(api.ping)
        .then(response => {
          this.pong = true
          setTimeout(() => {
            this.pong = false
          }, 3000)
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
