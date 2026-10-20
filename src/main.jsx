import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/martian-mono/index.css'
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import './styles/base.css'
import './styles/home.css'
import './styles/quiz.css'
import './styles/pages.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
