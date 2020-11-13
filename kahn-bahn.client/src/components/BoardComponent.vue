<template>
  <div class="col-12">
    <router-link :to="{name: 'ActiveBoard', params: {boardId: board.id}}">
      <div class="board-component col-11 m-4 border border-dark shadow">
        <div class="d-flex justify-content-between align-items-center">
          <h1>{{ board.title }}</h1>
          <button class="btn btn-danger m-3" @click.prevent="deleteBoard">
            X
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { boardService } from '../services/BoardService'
export default {
  name: 'BoardComponent',
  props: {
    boardProp: Object
  },
  setup(props) {
    return {
      board: computed(() => props.boardProp),
      deleteBoard() {
        boardService.deleteBoard(props.boardProp.id)
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
