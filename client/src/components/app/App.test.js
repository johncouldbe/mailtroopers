import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {shallow} from 'enzyme'

import {App}  from './App'

it('renders without crashing', () => {
  shallow(<App />)
})
