import React from 'react'
import ReactDOM from 'react-dom'
import {LogInWrapper} from './LogInWrapper'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LogInWrapper />, div)
})
