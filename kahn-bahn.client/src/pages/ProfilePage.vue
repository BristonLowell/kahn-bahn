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
      <div class="col-6">
        <div class="col-5 offset-3">
          <h1 class="display-3 underline mb-2 ml-4">
            My Boards
          </h1>
          <form @submit.prevent="createBoard" class="d-flex">
            <input type="text"
                   class="form-control"
                   aria-describedby="helpId"
                   placeholder="Board Title..."
                   v-model="state.newBoard.title"
            >
            <button type="submit" class="btn btn-success">
              +
            </button>
          </form>
        </div>
        <board-component v-for="board in boards" :key="board._id" :board-prop="board" />
      </div>
      <div class="text-center col-6">
        <h1>Anything I want</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import BoardComponent from '../components/BoardComponent'
import { boardService } from '../services/BoardService'
import { profileService } from '../services/ProfileService'

export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      newBoard: {}
    })
    onMounted(async() => {
      await profileService.getProfile()
      await boardService.getBoards()
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      boards: computed(() => AppState.boards),
      createBoard(event) {
        boardService.createBoard(state.newBoard)
        event.target.reset()
      }

    }
  },
  components: { BoardComponent }

}
</script>

<style scoped>
img {
  max-width: 100px;
}
.underline{
  /* // text-decoration-line: underline;
  // text-decoration-color: black;
  // text-decoration-style: solid; */
  text-decoration: none;
  border-bottom: 15px solid black;
}
</style>
