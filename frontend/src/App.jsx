import './App.scss'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { BrowserRouter } from 'react-router-dom'

import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom'

import MainPage from './Page/MainPage/MainPage'
import Board from './Page/Board/Board'
import Leadership from './Page/Leadership/Leadership'
import Service from './Page/Service/Service'
import Contact from './Page/Contact/Contact'
import About from './Page/About/About'

function Layout(){
  return(
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    
    </>
  )
}


const router =createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<MainPage/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/leadership',
        element:<Leadership/>
      },
      {
        path:'/board',
        element:<Board/>
      },
      {
        path:'/service',
        element:<Service/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
    ]
  }
])


function App() {

  return (
   <RouterProvider router={router}/>
  )
}

export default App
