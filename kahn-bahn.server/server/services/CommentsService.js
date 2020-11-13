import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getCommentsByBoardId(id) {
    const post = await dbContext.Comments.find({ board: id }).populate('list').populate('profile', '-updatedAt -subs').populate('task')
    if (!post) {
      throw new BadRequest('made an error')
    }
    return post
  }

  async createComment(newComment) {
    return await dbContext.Comments.create(newComment)
  }

  async deleteComment(userInfo, commentId) {
    const comment = await dbContext.Comments.findOneAndDelete({ profile: userInfo, _id: commentId })
    if (!comment) {
      throw new BadRequest('invalid id')
    }
    return comment
  }

  async editComment(userInfo, commentId, editedComment) {
    const comment = await dbContext.Comments.findOneAndUpdate({ profile: userInfo, _id: commentId }, editedComment)
    if (!comment) {
      throw new BadRequest('invalid id')
    }
    return comment
  }
}

export const commentsService = new CommentsService()
