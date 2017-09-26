import React from 'react'
import ReactDOM from 'react-dom'
import Comments from './Comments'
import { Provider } from 'react-redux'

import store from '../../../store'

it('Renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <Comments />
    </ Provider>, div)
})
