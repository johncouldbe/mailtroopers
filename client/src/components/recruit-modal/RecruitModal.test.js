import React from 'react'
import ReactDOM from 'react-dom'
import RecruitModal from './RecruitModal'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RecruitModal />, div)
})
