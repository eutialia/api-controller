<template>
<div>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>Port</md-table-head>
        <md-table-head>Password</md-table-head>
        <md-table-head>Method</md-table-head>
        <md-table-head>Traffic</md-table-head>
        <md-table-head>Modify</md-table-head>
      </md-table-row>
      <md-table-row v-for="item in sortedData" :key="item.index">
        <md-table-cell md-numeric>{{item.port}}</md-table-cell>
        <md-table-cell>{{item.password}}</md-table-cell>
        <md-table-cell>{{item.method}}</md-table-cell>
        <md-table-cell>{{(item.traffic/1024/1024).toFixed(2)}}GB</md-table-cell>
        <md-button @click="delPort(item.port)">Delete Port</md-button>
      </md-table-row>
      <md-table-row>
        <md-button @click="addPort">Add Port</md-button>
      </md-table-row>
    </md-table>
  </div>

  <div>
    <md-dialog-prompt
      :md-active.sync="activePrompt"
      v-model="portValue"
      md-title="Port"
      md-input-max-length="5"
      md-input-placeholder="Better be greater than 50000"
      md-confirm-text="Add" />
  </div>
</div>
</template>

<script>
import api from './resource/api.js'

export default {
  name: 'List',
  data: function () {
    return {
      portsInfo: null,
      portsTraffic: null,
      activePrompt: false,
      portValue: null
    }
  },
  computed: {
    sortedData: function () {
      let computedData = this.portsInfo
      for (let i = 0; i < computedData.length; i++) {
        computedData[i].traffic = this.portsTraffic[i].traffic
      }
      return computedData
    }
  },
  created: function () {
    this.$http.all([
      this.$http.get(api.getAllPorts),
      this.$http.get(api.getAllTraffic)
    ]).then(this.$http.spread((portsRes, trafficRes) => {
      this.portsInfo = portsRes
      this.portsTraffic = trafficRes
    }))
  },
  methods: {
    addPort: function () {
      let randomPassword = Math.random().toString(36).substring(2, 15)
      this.activePrompt = true
      this.$http.post('', { port: this.portValue, password: randomPassword, method: 'chacha20-poly-1305' })
        .then(response => {
          console.log('add port succeeded: ' + response)
        }).catch(error => {
          console.log('add port failed: ' + error)
        })
    },
    delPort: function (port) {
      this.$http.delete(api.delPort + port)
        .then(response => {
          console.log('delete succeeded: ' + response)
          this.$forceUpdate()
        }).catch(error => {
          console.log('delete failed: ' + error)
        })
    }
  }
}
</script>
