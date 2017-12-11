import React from 'react'
import ReactDOM from 'react-dom'
import {CopiedModal} from './CopiedModal'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<CopiedModal />)
})
