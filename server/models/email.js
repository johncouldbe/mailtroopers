const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
  master: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  contributors: [{
    contributor: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
  }],
  slug: {
    type: String
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
