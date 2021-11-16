const mongoose  = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "must provide name"],
        trim: true,
        maxlength: [20, "name cannot br more than 20 char"]
      },
      isDone: {
          type: Boolean,
          default: false,
      },
})


module.exports = mongoose.model('Task', taskSchema)