import React from 'react'
import ReactDOM from 'react-dom'
import {CopiedModal} from './CopiedModal'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CopiedModal />, div)
})
