import React from 'react'
import ReactDOM from 'react-dom'
import {CommentModal} from './CommentModal'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CommentModal />, div)
})
