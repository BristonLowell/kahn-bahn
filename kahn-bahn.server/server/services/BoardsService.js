import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAllBoards(query = {}) {
    return await dbContext.Boards.find(query).populate('profile')
  }

  async createBoard(newBoard) {
    return await dbContext.Boards.create(newBoard)
  }

  async deleteBoard(userInfo, boardId) {
    const board = await dbContext.Boards.findOneAndDelete({ profile: userInfo, _id: boardId })
    if (!board) {
      throw new BadRequest('invalid id')
    }
    return board
  }

  async editBoard(userInfo, boardId, editedBoard) {
    const board = await dbContext.Boards.findOneAndUpdate({ profile: userInfo, _id: boardId }, editedBoard)
    if (!board) {
      throw new BadRequest('invalid id')
    }
    return board
  }
}

export const boardsService = new BoardsService()

// import { dbContext } from "../db/DbContext";
// import { BadRequest } from "../utils/Errors";
// class PostService {
//   async getAll(query = {}) {
//     let post = await dbContext.Post.find(query).populate("creator", "-updatedAt -subs");
//     return post;
//   }
//   async getMyPosts(id) {
//     let post = await dbContext.Post.find({ userId: id });
//     if (!post) {
//       throw new BadRequest("Invalid Id");
//     }
//     return post;
//   }
//   async delete(userId, id) {
//     let post = await dbContext.Post.findOneAndDelete({ userId, _id: id })
//     if (!post) {
//       throw new BadRequest("Invalid Id");
//     }
//     return post;
//   }
//   async create(data) {
//     return await dbContext.Post.create(data)
//   }
// }
// export const postService = new PostService();
