import React from 'react'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

export const CalendarApp = () => {
  return (

    <Provider store={ store }>
      <BrowserRouter>
      {/* una manera de solucionar el problema de rutas, no es recomendado utilizar, mejor hacer el arreglo en el backend */}
      {/* <HashRouter> */}
        <AppRouter />
      {/* </HashRouter> */}
      </BrowserRouter>
    </Provider>
  )
}
