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

let zoomRatio = .95;
let fontSizeRatio = zoomRatio;
const PAGE_RATIO = 1 / 1.414;
const onWindowResize = () => {
  const page = document.querySelector('.Page');
  const newHeight = window.innerHeight * zoomRatio;
  const newWidth = window.innerHeight * zoomRatio * PAGE_RATIO;
  page.style.height = newHeight + 'px';
  page.style.width = newWidth + 'px';

  page.style.fontSize = (fontSizeRatio * 2) + 'vh';
};
window.onresize = onWindowResize;

(function onLoadResize() {
  const page = document.querySelector('.Page');
  if (!page)
    setTimeout(onLoadResize, 20)
  else onWindowResize();
})()
