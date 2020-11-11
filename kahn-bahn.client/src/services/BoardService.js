import { api } from './AxiosService'
import { AppState } from '../AppState'

class BoardService {
  async getBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }
}

export const boardService = new BoardService()
