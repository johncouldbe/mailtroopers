import React from 'react'
import ReactDOM from 'react-dom'
import RecruitModal from './RecruitModal'
import { Provider } from 'react-redux'

import store from '../../store'


it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <RecruitModal />
    </ Provider>, div)
})
