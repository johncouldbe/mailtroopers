const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  master: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  contributors: [{
    contributor: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
  }],
  slug: {
    type: String,
    unique: true,
    required: true
  },
  versions: [{
    html: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    },
    comments: [{
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      date: {
        type: Date,
        default: Date.now()
      },
      comment: {type: String}
    }]
  }]
})

const Email = mongoose.model('Email', EmailSchema)

module.exports = {Email}
