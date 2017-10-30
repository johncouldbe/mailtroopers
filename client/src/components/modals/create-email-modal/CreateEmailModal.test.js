import React from 'react'
import ReactDOM from 'react-dom'
import {CreateEmailModal} from './CreateEmailModal'
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<CreateEmailModal />)
})
