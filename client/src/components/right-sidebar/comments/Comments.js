import React, {Component} from 'react'
// import {BrowserRouter as Link} from 'react-router-dom'

import './Comments.css'

export default class Troop extends Component {
  constructor(props){
    super(props)
    this.commentsArray = [
      {
        name: 'John Brown',
        comment: 'I think we should do this nifty thing.',
        date: 'A few seconds ago'
      },
      {
        name: 'Autumn Brown',
        comment: "I'm gonna agree with John. Also, can we add a few sponsor. I just gave them to what's his name.",
        date: 'An hour ago'
      },
      {
        name: 'Baloo Brown',
        comment: "I'm gonna agree with John. Also, can we add a few sponsor. I just gave them to what's his name.",
        date: 'One day ago'
      }
    ]

    this.comments = this.commentsArray.map((comment, index) => {
      return <div className="comment" key={index}>
        <div className="comment-container">
          <div className="h3 red-text comment-name">{comment.name}</div>
          <div className="h4 blue-text comment-date">{comment.date}</div>
          <div className="p grey-text comment-comment">{comment.comment}</div>
        </div>
      </div>
    })
  }

  render(){
    return(
      <div className="comments">
        {this.comments}
      </div>
    )
  }
}
