import { useState } from 'react'
import './styles/reset.css'
import './styles/App.css'
import defaultFormData from './formData'
import Preview from './components/Preview'
import Form from './components/Form'



function App() {
  const [formData, setFormData] = useState(defaultFormData);

  return (
    <div id='main-container'>
      <Form formData={formData} setFormData={setFormData} />
      <Preview formData={formData} />
    </div>
  )
}

export default App


