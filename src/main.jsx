import React from 'react'
import ReactDOM from 'react-dom'
import '/src/styles/index.css'
import App from '/src/App.js'
import { useMediaQuery } from 'react-responsive'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
