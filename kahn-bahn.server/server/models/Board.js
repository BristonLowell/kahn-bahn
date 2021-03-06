import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Board = new Schema(
  {
    title: { type: String, required: true },
    profile: { type: String, ref: 'Profile', required: true }
    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)

Board.virtual('creator', {
  localField: 'profile',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
export default Board
