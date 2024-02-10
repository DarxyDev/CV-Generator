import { useState } from 'react'
import './styles/reset.css'
import './styles/App.css'
import Preview from './components/Preview'
import Form from './components/Form'

function App() {

  return (
    <div id='main-container'>
      <Form />
      <Preview />
    </div>
  )
}

export default App
