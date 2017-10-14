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
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  slug: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  versions: [{
    html: {
      type: String
    },
    subject: {
      type: String
    },
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      date: {
        type: Date,
        default: Date.now()
      },
      comment: {type: String}
    }]
  }]
})

EmailSchema.methods.apiRepr = function() {
    return {
        name: this.name,
        master: this.master,
        date: this.date,
        _id: this._id
    };
};

const Email = mongoose.model('Email', EmailSchema)

module.exports = {Email}
