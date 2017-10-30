import React from 'react'
import ReactDOM from 'react-dom'
import {SignUpWrapper} from './SignUpWrapper'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<SignUpWrapper />)
})
