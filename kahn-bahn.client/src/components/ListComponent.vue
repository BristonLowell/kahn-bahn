<template>
  <div class="list-compnent col-3 ">
    <div class="m-3 border border-dark shadow-lg text-center rounded p-2">
      <div class="d-flex justify-content-between align-items-center">
        <form class="form-group" @submit.prevent="editList">
          <input type="text"
                 class="form-control border border-0 bg-transparent font-size"
                 aria-describedby="helpId"
                 v-model="state.editedList.title"
          >
        </form>
        <button class="btn btn-danger ml-3 mt-3 mb-3" @click.prevent="deleteList">
          X
        </button>
      </div>
      <form @submit.prevent="createTask" class="d-flex">
        <input type="text"
               class="form-control"
               aria-describedby="helpId"
               placeholder="Task Title..."
               v-model="state.newTask.title"
        >
        <button type="submit" class="btn btn-success">
          +
        </button>
      </form>
      <task-component v-for="task in tasks" :key="task" :task-prop="task" :list-prop="list" />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
import { useRoute } from 'vue-router'
import { listService } from '../services/ListService'
// import { taskService } from '../services/TaskService'
// import { useRoute } from 'vue-router'
export default {
  name: 'ListComponent',
  props: {
    listProp: Object
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newTask: {},
      editedList: {
        title: props.listProp.title
      }
    })
    // const route = useRoute()

    // onMounted(async() => {
    //   await taskService.getTasks(route.params.boardId)
    // })
    return {
      state,
      list: computed(() => props.listProp),
      tasks: computed(() => AppState.tasks),
      deleteList() {
        listService.deleteList(props.listProp.id, route.params.boardId)
      },
      createTask(event) {
        taskService.createTask(state.newTask, route.params.boardId, props.listProp.id)
        event.target.reset()
      },
      editList() {
        listService.editList(route.params.boardId, props.listProp.id, state.editedList)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.font-size{
font-size: 30px;
}
</style>
