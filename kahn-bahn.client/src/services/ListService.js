import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
import { logger } from '../utils/Logger'
class ListService {
  async getLists(boardId) {
    const res = await api.get('api/boards/' + boardId + '/lists')
    AppState.lists = res.data
  }

  async createList(newList, boardId) {
    try {
      await api.post('api/boards/' + boardId + '/lists', newList)
      this.getLists(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteList(listId, boardId) {
    try {
      await api.delete('api/boards/' + boardId + '/lists/' + listId)
      this.getLists(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async editList(boardId, listId, editedList) {
    try {
      await api.put('api/boards/' + boardId + '/lists/' + listId, editedList)
      this.getLists(boardId)
    } catch (error) {
      logger.error(error)
    }
  }
}
export const listService = new ListService()
