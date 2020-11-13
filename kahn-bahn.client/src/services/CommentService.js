import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
class CommentService {
  async getComments(boardId) {
    try {
      const res = await api.get('api/boards/' + boardId + '/comments')
      logger.log(res.data)
      AppState.comments = res.data
      logger.log(AppState.tasks)
    } catch (error) {
      logger.error(error)
    }
  }

  async createComment(newComment, boardId, listId, taskId) {
    try {
      await api.post('api/boards/' + boardId + '/lists/' + listId + '/tasks/' + taskId + '/comments', newComment)
      this.getComments(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async editComment(boardId, listId, taskId, commentId, editedComment) {
    try {
      await api.put('api/boards/' + boardId + '/lists/' + listId + '/tasks/' + taskId + '/comments/' + commentId, editedComment)
      this.getComments(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteComment(boardId, listId, taskId, commentId) {
    try {
      await api.delete('api/boards/' + boardId + '/lists/' + listId + '/tasks/' + taskId + '/comments/' + commentId)
      this.getComments(boardId)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const commentService = new CommentService()
