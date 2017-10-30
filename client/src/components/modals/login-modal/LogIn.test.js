import React from 'react'
import ReactDOM from 'react-dom'
import {LogInWrapper} from './LogInWrapper'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<LogInWrapper />)
})
