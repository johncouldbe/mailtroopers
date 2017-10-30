import React from 'react'
import ReactDOM from 'react-dom'
import {RecruitModal} from './RecruitModal'
import {shallow} from 'enzyme'

it('Renders without crashing', () => {
  shallow(<RecruitModal />)
  // const div = document.createElement('div')
  // ReactDOM.render(<RecruitModal />, div)
})
