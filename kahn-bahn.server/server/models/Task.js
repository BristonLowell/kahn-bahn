import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new Schema(
  {
    title: { type: String, required: true },
    profile: { type: String, ref: 'Profile', required: true },
    list: { type: String, ref: 'List', required: true },
    board: { type: String, ref: 'Board', required: true }
    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'profile',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

Task.virtual('creator', {
  localField: 'list',
  ref: 'List',
  foreignField: '_id',
  justOne: true
})
export default Task
