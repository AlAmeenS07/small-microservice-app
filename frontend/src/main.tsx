import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/store.ts"
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster position='top-right'/>
      <App />
    </Provider>
  </BrowserRouter>,
)
