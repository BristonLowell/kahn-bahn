import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import BaseController from '../utils/BaseController'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllBoards)
      .get('/:boardId/lists', this.getListsByBoard)
      .get('/:boardId/tasks', this.getTasksByBoardId)
      .get('/:boardId/comments', this.getCommentsByBoardId)
      .post('', this.createBoard)
      .post('/:boardId/lists', this.createList)
      .post('/:boardId/lists/:listId/tasks', this.createTask)
      .post('/:boardId/lists/:listId/tasks/:taskId/comments', this.createComment)
      .delete('/:boardId', this.deleteBoard)
      .delete('/:boardId/lists/:listId', this.deleteList)
      .delete('/:boardId/lists/:listId/tasks/:taskId', this.deleteTask)
      .delete('/:boardId/lists/:listId/tasks/:taskId/comments/:commentId', this.deleteComment)
      .put('/:boardId', this.editBoard)
      .put('/:boardId/lists/:listId', this.editList)
      .put('/:boardId/lists/:listId/tasks/:taskId', this.editTask)
      .put('/:boardId/lists/:listId/tasks/:taskId/comments/:commentId', this.editComment)
  }

  async getAllBoards(req, res, next) {
    try {
      res.send(await boardsService.getAllBoards(req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
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
      req.body.profile = req.userInfo.id
      req.body.board = req.params.boardId
      res.send(await listsService.createList(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getTasksByBoardId(req, res, next) {
    try {
      res.send(await tasksService.getTasksByBoardId(req.params.boardId))
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByBoardId(req, res, next) {
    try {
      res.send(await commentsService.getCommentsByBoardId(req.params.boardId))
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
      req.body.board = req.params.boardId
      req.body.list = req.params.listId
      res.send(await tasksService.createTask(req.body))
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.profile = req.userInfo.id
      req.body.board = req.params.boardId
      req.body.list = req.params.listId
      req.body.task = req.params.taskId
      res.send(await commentsService.createComment(req.body))
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

  async deleteComment(req, res, next) {
    try {
      res.send(await commentsService.deleteComment(req.userInfo.id, req.params.commentId))
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

  async editComment(req, res, next) {
    try {
      res.send(await commentsService.editComment(req.userInfo.id, req.params.commentId, req.body))
    } catch (error) {
      next(error)
    }
  }
}
