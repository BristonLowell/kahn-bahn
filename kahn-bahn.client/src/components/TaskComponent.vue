<template>
  <div class="task-component col-12">
    <div class="card" v-if="task.list.id === list.id">
      <div class="d-flex justify-content-between align-items-center">
        <p class="border-bottom border-dark" data-toggle="modal" :data-target="'#modal' + task.id">
          {{ task.title }}
        </p>
        <div class="d-flex ml-3 mt-3 mb-3">
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
          <div class="modal-header">
            <h5 class="modal-title">
              Edit Task
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input type="text"
                     class="form-control"
                     aria-describedby="helpId"
                     placeholder="New Title"
                     v-model="state.editedTask.title"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="editTask">
              Save changes
            </button>
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
      }
    })
    const route = useRoute()
    return {
      state,
      task: computed(() => props.taskProp),
      list: computed(() => props.listProp),
      editTask() {
        taskService.editTask(route.params.boardId, props.listProp.id, props.taskProp.id, state.editedTask)
      },
      deleteTask() {
        taskService.deleteTask(route.params.boardId, props.listProp.id, props.taskProp.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
