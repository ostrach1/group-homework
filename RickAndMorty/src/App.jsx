import { useState } from 'react'
import React from 'react'
import './index.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import EndpointPage from './components/EndpointPage'
import Mainpage from './components/Mainpage'
import RootLayout from './layouts/RootLayout';
import ItemPage from './components/ItemPage';
import {useMode, ThemeContext} from './context/ThemeContext';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <RootLayout />}>
    <Route index element={ <Mainpage />} />
    <Route path="/characters" element={<EndpointPage endpointName="character" />} />
    <Route path="/episodes" element={<EndpointPage endpointName="episode" />} />
    <Route path="/locations" element={<EndpointPage endpointName="location" />} />
    <Route path="/:endpointName/:id" element={<ItemPage/>} />
    </Route>
  ))

function App() {
const [theme, colorMode] = useMode()

  return (
    <SnackbarProvider>

    <ThemeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <div className="App">

  <RouterProvider router={router} />

    </div>
    </ThemeProvider>
    </ThemeContext.Provider>
    </SnackbarProvider>

  )
}

export default App
