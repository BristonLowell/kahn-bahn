<template>
  <div class="col-6">
    <div class="col-5 offset-3">
      <h1 class="display-3 underline mb-2 ml-4">
        My Boards
      </h1>
    </div>
    <div class="board-component col-11 m-4 border border-dark shadow">
      <h1> {{ board.title }}</h1>
    </div>
  </div>
  <div class="col-6">
    <div class="col-12">
      Anything I want
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'BoardComponent',
  props: {
    boardProp: Object
  },
  setup(props) {
    return {
      board: computed(() => props.boardProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.underline{
  // text-decoration-line: underline;
  // text-decoration-color: black;
  // text-decoration-style: solid;
  text-decoration: none;
  border-bottom: 15px solid black;
}
</style>
