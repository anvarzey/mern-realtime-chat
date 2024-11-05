import mongoose from 'mongoose'

export const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI)
    .then(function () {
      console.log('Connected to Database')
    })
    .catch(err => err)
}

export const disconnectToMongo = async () => {
  await mongoose.disconnect()
}
