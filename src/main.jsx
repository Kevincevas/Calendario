import React from 'react'
import ReactDOM from 'react-dom/client'
import { CalendarApp } from './CalendarApp'
import './styles.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <CalendarApp />
  // </React.StrictMode>,
)
