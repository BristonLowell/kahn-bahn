<template>
  <div class="comment-component col-12 d-flex" v-if="comment.task.id === task.id">
    <div class="col-11">
      <form class="form-group" @submit.prevent="editComment()">
        <input type="text border border-0 bg-transparent"
               class="form-control"
               aria-describedby="helpId"
               placeholder="New Title"
               v-model="state.editedComment.title"
        >
      </form>
    </div>
    <div class="col-1">
      <button class="btn btn-danger" @click.prevent="deleteComment">
        &times;
      </button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { commentService } from '../services/CommentService'
import { useRoute } from 'vue-router'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: Object,
    taskProp: Object,
    listProp: Object
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      editedComment: {
        title: props.commentProp.title
      }
    })
    return {
      state,
      comment: computed(() => props.commentProp),
      task: computed(() => props.taskProp),
      list: computed(() => props.listProp),
      editComment() {
        commentService.editComment(route.params.boardId, props.listProp.id, props.taskProp.id, props.commentProp.id, state.editedComment)
      },
      deleteComment() {
        commentService.deleteComment(route.params.boardId, props.listProp.id, props.taskProp.id, props.commentProp.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
