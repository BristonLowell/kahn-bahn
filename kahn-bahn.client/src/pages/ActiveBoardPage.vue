<template>
  <div class="active-board container-fluid">
    <div class="row">
      <div class="col-12 ">
        <form class="form-group" @submit.prevent="editBoard">
          <input type="text"
                 class="form-control border border-0 bg-transparent font-size text-center"
                 aria-describedby="helpId"
                 :placeholder="board.title"
                 v-model="state.editedBoard.title"
          >
        </form>
      </div>
      <div class="col-4 offset-4">
        <form @submit.prevent="createList" class="d-flex">
          <input type="text"
                 class="form-control"
                 aria-describedby="helpId"
                 placeholder=" New List Title..."
                 v-model="state.newList.title"
          >
          <button type="submit" class="btn btn-success">
            +
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <list-component v-for="list in lists" :key="list" :list-prop="list" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { listService } from '../services/ListService'
import { useRoute } from 'vue-router'
import ListComponent from '../components/ListComponent'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import { taskService } from '../services/TaskService'
import { boardService } from '../services/BoardService'
import { commentService } from '../services/CommentService'

export default {
  name: 'ActiveBoard',
  props: {
  },
  setup() {
    const state = reactive({
      newList: {},
      editedBoard: {
      }
    })
    const route = useRoute()
    onMounted(async() => {
      await profileService.getProfile()
      await listService.getLists(route.params.boardId)
      await taskService.getTasks(route.params.boardId)
      await taskService.getTasks(route.params.boardId)
      await boardService.getActiveBoard(route.params.boardId)
      await commentService.getComments(route.params.boardId)
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      lists: computed(() => AppState.lists),
      board: computed(() => AppState.activeBoard),
      editBoard(event) {
        boardService.editBoard(route.params.boardId, state.editedBoard)
        event.target.reset()
      },
      createList(event) {
        listService.createList(state.newList, route.params.boardId)
        event.target.reset()
      }
    }
  },
  components: { ListComponent }
}
</script>

<style lang="scss" scoped>
.font-size{
font-size: 75px;
}
</style>
