import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import BaseController from '../utils/BaseController'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBoards)
      .get('/:boardId/lists', this.getListsByBoard)
      .get('/:boardId/lists/:listId/tasks', this.getTasksByListId)
      .post('', this.createBoard)
      .post('/:boardId/lists', this.createList)
      .post('/:boardId/lists/:listId/tasks', this.createTask)
      .delete('/:boardId', this.deleteBoard)
      .delete('/:boardId/lists/:listId', this.deleteList)
      .delete('/:boardId/lists/:listId/tasks/:taskId', this.deleteTask)
      .put('/:boardId', this.editBoard)
      .put('/:boardId/lists/:listId', this.editList)
      .put('/:boardId/lists/:listId/tasks/:taskId', this.editTask)
  }

  async getAllBoards(req, res, next) {
    try {
      res.send(await boardsService.getAllBoards())
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      res.send(await boardsService.createBoard(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getListsByBoard(req, res, next) {
    try {
      res.send(await listsService.getListsByBoard(req.params.boardId))
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      res.send(await listsService.createList(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getTasksByListId(req, res, next) {
    try {
      res.send(await tasksService.getTasksByListId(req.params.listId))
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      res.send(await tasksService.createTask(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      res.send(await boardsService.deleteBoard(req.userInfo.id, req.params.boardId))
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      res.send(await listsService.deleteList(req.userInfo.id, req.params.listId))
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      res.send(await tasksService.deleteTask(req.userInfo.id, req.params.taskId))
    } catch (error) {
      next(error)
    }
  }

  async editBoard(req, res, next) {
    try {
      res.send(await boardsService.editBoard(req.userInfo.id, req.params.boardId, req.body))
    } catch (error) {
      next(error)
    }
  }

  async editList(req, res, next) {
    try {
      res.send(await listsService.editList(req.userInfo.id, req.params.listId, req.body))
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      res.send(await tasksService.editTask(req.userInfo.id, req.params.taskId, req.body))
    } catch (error) {
      next(error)
    }
  }
}
