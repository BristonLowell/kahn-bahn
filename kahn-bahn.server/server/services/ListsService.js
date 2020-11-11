import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class ListsService {
  async getListsByBoard(id) {
    const post = await dbContext.Lists.find({ board: id }).populate('board').populate('profile', '-updatedAt -subs')
    if (!post) {
      throw new BadRequest('made an error')
    }
    return post
  }

  async createList(newList) {
    return await dbContext.Lists.create(newList)
  }

  async deleteList(userInfo, listId) {
    const list = await dbContext.Lists.findOneAndDelete({ profile: userInfo, _id: listId })
    if (!list) {
      throw new BadRequest('invalid id')
    }
    return list
  }

  async editList(userInfo, listId, editedList) {
    const list = await dbContext.Lists.findOneAndUpdate({ profile: userInfo, _id: listId }, editedList)
    if (!list) {
      throw new BadRequest('invalid id')
    }
    return list
  }
}

export const listsService = new ListsService()
