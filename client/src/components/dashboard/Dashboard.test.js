import React from 'react'
import ReactDOM from 'react-dom'
import {Dashboard} from './Dashboard'
import {MemoryRouter} from 'react-router-dom'
import {shallow} from 'enzyme'

it('renders without crashing', () => {

  shallow(
    <MemoryRouter>
      <Dashboard />
    </ MemoryRouter>)
})
