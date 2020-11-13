import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class BoardService {
  async getBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async createBoard(newBoard) {
    try {
      logger.log('hello')
      await api.post('api/boards', newBoard)
      this.getBoards()
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBoard(boardId) {
    try {
      await api.delete('api/boards/' + boardId)
      this.getBoards()
    } catch (error) {
      logger.error(error)
    }
  }

  async editBoard(boardId, editedBoard) {
    try {
      await api.put('api/boards/' + boardId, editedBoard)
      this.getActiveBoard(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async getActiveBoard(boardId) {
    try {
      const res = await api.get('api/boards')
      AppState.activeBoard = res.data.find(b => b.id === boardId)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const boardService = new BoardService()
