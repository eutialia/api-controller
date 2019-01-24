<template>
  <div class="container">
    <md-card>
      <md-card-header>
        <div class="md-title">Authentication Required</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Address</label>
          <md-input v-model="url"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button @click="submitCredentials()">Submit</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import api from '../components/resource/api.js'

export default {
  name: 'login',
  data: function () {
    return {
      password: '',
      url: ''
    }
  },
  methods: {
    submitCredentials () {
      this.$store.commit('set_url', this.url)
      this.$http.post(api.login, { password: this.password })
        .then(response => {
          if (response.status !== 201) {
            console.log(response.error)
            this.$store.commit('auth_error')
          } else {
            this.$store.commit('auth_success', response.data.token)
            this.$router.push({
              path: '/'
            })
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .container {
    width: 400px;
    margin: auto;
  }
</style>
