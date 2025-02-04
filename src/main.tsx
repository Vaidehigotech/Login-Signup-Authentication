import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@fontsource/poppins/400.css";  
import { Provider } from 'react-redux'; 
import store from './Store/store.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store = {store}>
   <App />
   </Provider>
  </StrictMode>,
)
