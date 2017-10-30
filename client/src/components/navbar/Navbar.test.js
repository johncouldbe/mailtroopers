import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar} from './Navbar'
import {MemoryRouter} from 'react-router-dom'
import {shallow} from 'enzyme'

it('renders without crashing', () => {

  shallow(
    <MemoryRouter>
      <Navbar />
    </ MemoryRouter>)
})
