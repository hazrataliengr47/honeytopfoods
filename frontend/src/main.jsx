import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from "./Context/CartContext.jsx";
import { Authprovider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Authprovider>
    <CartProvider>
       <App />
    </CartProvider>
    </Authprovider>   
    </BrowserRouter>
  </StrictMode>,
)
