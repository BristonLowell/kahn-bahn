<template>
  <div class="about text-center container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Welcome {{ profile.name }}</h1>
        <img class="rounded" :src="profile.picture" alt="" />
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <div class="row">
      <board-component v-for="board in boards" :key="board._id" :board-prop="board" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import BoardComponent from '../components/BoardComponent'
import { boardService } from '../services/BoardService'

export default {
  name: 'Profile',
  setup() {
    onMounted(async() => {
      await boardService.getBoards()
    })
    return {
      profile: computed(() => AppState.profile),
      boards: computed(() => AppState.boards)

    }
  },
  components: { BoardComponent }

}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
