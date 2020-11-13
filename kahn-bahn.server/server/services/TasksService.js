import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getTasksByBoardId(id) {
    const post = await dbContext.Tasks.find({ board: id }).populate('list').populate('profile', '-updatedAt -subs')
    if (!post) {
      throw new BadRequest('made an error')
    }
    return post
  }

  async createTask(newTask) {
    return await dbContext.Tasks.create(newTask)
  }

  async deleteTask(userInfo, taskId) {
    const task = await dbContext.Tasks.findOneAndDelete({ profile: userInfo, _id: taskId })
    const comment = await dbContext.Comments.deleteMany({ task: taskId })
    if (!task || !comment) {
      throw new BadRequest('invalid id')
    }
    return task
  }

  async editTask(userInfo, taskId, editedTask) {
    const task = await dbContext.Tasks.findOneAndUpdate({ profile: userInfo, _id: taskId }, editedTask)
    if (!task) {
      throw new BadRequest('invalid id')
    }
    return task
  }
}

export const tasksService = new TasksService()
