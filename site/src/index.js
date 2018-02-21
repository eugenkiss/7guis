import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// noinspection JSUnusedGlobalSymbols
export default App

if (typeof document !== 'undefined') {
  ReactDOM.render(<App/>, document.getElementById('root'))
}
