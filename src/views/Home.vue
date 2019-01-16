<template>
  <div class="container">
    <md-card>
      <md-card-header>
        <div class="md-title">
          <Sidebar/>
        </div>
      </md-card-header>
      <md-card-content>
        <List/>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    Sidebar,
    List
  }
}
</script>

<style scoped>

</style>
