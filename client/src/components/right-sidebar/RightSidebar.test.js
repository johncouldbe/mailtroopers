import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from '../../store'

import RightSidebar from './RightSidebar'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <RightSidebar />
    </ Provider>
    , div)
})
