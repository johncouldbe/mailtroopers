import React from 'react'
import ReactDOM from 'react-dom'
import CreateEmailModal from './CreateEmailModal'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CreateEmailModal />, div)
})
