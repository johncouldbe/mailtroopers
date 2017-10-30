import React from 'react'
import ReactDOM from 'react-dom'
import {Main} from './Main'
import {MemoryRouter} from 'react-router-dom'
import {shallow} from 'enzyme'

it('renders without crashing', () => {

  shallow(
    <MemoryRouter>
      <Main />
    </ MemoryRouter>)
})
