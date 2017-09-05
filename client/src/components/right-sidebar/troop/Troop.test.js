import React from 'react'
import ReactDOM from 'react-dom'
import Troop from './Troop'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Troop />, div)
})
