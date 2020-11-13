import { api } from '../services/AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
class TaskService {
  async getTasks(boardId) {
    try {
      const res = await api.get('api/boards/' + boardId + '/tasks')
      logger.log(res.data)
      AppState.tasks = res.data
      logger.log(AppState.tasks)
    } catch (error) {
      logger.error(error)
    }
  }

  async createTask(newTask, boardId, listId) {
    try {
      await api.post('api/boards/' + boardId + '/lists/' + listId + '/tasks', newTask)
      this.getTasks(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteTask(boardId, listId, taskId) {
    try {
      await api.delete('api/boards/' + boardId + '/lists/' + listId + '/tasks/' + taskId)
      this.getTasks(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async editTask(boardId, listId, taskId, editedTask) {
    try {
      await api.put('api/boards/' + boardId + '/lists/' + listId + '/tasks/' + taskId, editedTask)
      this.getTasks(boardId)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const taskService = new TaskService()
