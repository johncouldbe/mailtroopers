import React from 'react'
import ReactDOM from 'react-dom'
import {Comments} from './Comments'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Comments />, div)
})
