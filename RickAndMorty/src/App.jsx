import { useState } from 'react'
import React from 'react'
import './App.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import EndpointPage from './components/EndpointPage'
import Mainpage from './components/Mainpage'
import RootLayout from './layouts/RootLayout';
import ItemPage from './components/ItemPage';


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


  return (
    <div className="App">

  <RouterProvider router={router} />

    </div>
  )
}

export default App
