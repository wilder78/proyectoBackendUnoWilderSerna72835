import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: false
    },
  },
  { timestamps: true, versionKey: false, }
)

export const UserModel = mongoose.model(userCollection, userSchema)
