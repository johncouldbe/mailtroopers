import React from 'react'
import ReactDOM from 'react-dom'
import {RightSidebar} from './RightSidebar'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RightSidebar />, div)
})
