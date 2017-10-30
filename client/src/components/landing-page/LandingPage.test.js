import React from 'react'
import ReactDOM from 'react-dom'
import {LandingPage} from './LandingPage'
import {MemoryRouter} from 'react-router-dom'
import {shallow} from 'enzyme'

it('renders without crashing', () => {

  shallow(
    <MemoryRouter>
      <LandingPage />
    </ MemoryRouter>)
})
