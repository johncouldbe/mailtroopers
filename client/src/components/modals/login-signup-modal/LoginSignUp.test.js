import React from 'react'
import ReactDOM from 'react-dom'
import LogInSignUp from './LogInSignUp'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LogInSignUp />, div)
})
