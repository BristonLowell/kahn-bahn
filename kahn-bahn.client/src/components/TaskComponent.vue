<template>
  <div class="task-component col-12">
    <div class="" v-if="task.list.id === list.id">
      <div>
        <form class="form-group mt-3" @submit.prevent="editTask">
          <input type="text"
                 class="form-control mt-3"
                 name=""
                 id=""
                 aria-describedby="helpId"
                 placeholder="Add a comment"
                 v-model="state.editedTask.title"
          >
        </form>

        <div class="d-flex mt-1 d-flex col-12 justify-content-end mb-5">
          <form class="form-group d-flex">
            <input type="text"
                   class="form-control"
                   aria-describedby="helpId"
                   placeholder="Add a comment"
                   v-model="state.movedTask.list"
            >
            <button class="btn btn-info ml-1 " @click.prevent="moveTask">
              Move
            </button>
          </form>
          <button class="border border-dark rounded btn btn-warning ml-1" data-toggle="modal" :data-target="'#modal' + task.id">
            Comment
          </button>
          <button class="btn btn-danger ml-1" @click.prevent="deleteTask">
            &times;
          </button>
        </div>
      </div>
    </div>
    <div class="modal fade"
         :id="'modal' + task.id"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header d-flex flex-column">
            <h1>{{ task.title }}</h1>
            <h5 class="modal-title">
              <form class="form-group d-flex">
                <input type="text"
                       class="form-control"
                       name=""
                       id="form"
                       aria-describedby="helpId"
                       placeholder="Add a comment"
                       v-model="state.movedTask.list"
                >
                <button type="button" data-target="#form" @click.prevent="createComment" class="btn btn-success">
                  +
                </button>
              </form>
            </h5>
          </div>
          <div class="modal-body">
            <div class="row text-center">
              <comment-component v-for="comment in comments" :key="comment" :comment-prop="comment" :task-prop="task" :list-prop="list" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <!-- <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="editTask">
              Save changes
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { taskService } from '../services/TaskService'
import { useRoute } from 'vue-router'
import CommentComponent from '../components/CommentComponent'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'

export default {
  name: 'TaskComponent',
  props: {
    taskProp: Object,
    listProp: Object
  },
  setup(props) {
    const state = reactive({
      editedTask: {
        title: props.taskProp.title
      },
      movedTask: {
        list: 'Enter List Name'
      },
      newComment: {}
    })
    const route = useRoute()
    return {
      state,
      task: computed(() => props.taskProp),
      list: computed(() => props.listProp),
      comments: computed(() => AppState.comments),
      editTask() {
        taskService.editTask(route.params.boardId, props.listProp.id, props.taskProp.id, state.editedTask)
      },
      deleteTask() {
        taskService.deleteTask(route.params.boardId, props.listProp.id, props.taskProp.id)
      },
      createComment() {
        commentService.createComment(state.newComment, route.params.boardId, props.listProp.id, props.taskProp.id)
      },
      moveTask() {
        const listId = AppState.lists.find(l => l.title === state.movedTask.list)
        state.movedTask.list = listId
        taskService.editTask(route.params.boardId, props.listProp.id, props.taskProp.id, state.movedTask)
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>

</style>
