import React from 'react'
import ReactDOM from 'react-dom'
import LeftSidebar from './LeftSidebar'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LeftSidebar />, div)
})
