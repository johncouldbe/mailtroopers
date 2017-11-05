import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {App}  from './App'


Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<App />)
})
