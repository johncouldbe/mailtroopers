import React from 'react'
import ReactDOM from 'react-dom'
import {RightSidebar} from './RightSidebar'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<RightSidebar />)
})
