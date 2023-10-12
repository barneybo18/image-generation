import React from 'react';
import { BrowserRouter, Form, Link, Route, Routes } from 'react-router-dom';

import {logo, linkedin, github} from './assets'
import { Home, CreatePost } from './pages'

 const App = () => {
  return (
        <BrowserRouter>
          <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] sticky top-0'>
            <Link to="/">
              <img src={logo} alt="logo" className='w-[180px] object-contain' />
            </Link>

            
            <Link to="/create-post" className='font-inter font-medium bg-gradient-to-r from-sky-500 via-50% to-indigo-500 to-55% text-white px-4 py-2 rounded-md'>Create</Link>
          </header>
          <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/create-post" element={<CreatePost />}/>
            </Routes>
          </main>

          <footer className='w-full items-center bg-blue-950 sm:px-8 px-4 py-4'>
            <div className='flex flex-row space-x-2.5 items-center '>
            <Link to="https://github.com/barneybo18?tab=repositories" target='_blank'>
            <img src={github} alt='github' className='w-[20px]'/>
            </Link>

            <Link to="https://www.linkedin.com/in/oboh-barnabas-a36a84247/" target='_blank'>
            <img src={linkedin} alt='linkedin' className='w-[20px]'/>
            </Link>
            </div>
           <p className='text-white text-center'>©️ 2023 Oboh Barnabas</p>
          </footer>
        </BrowserRouter>
      )
    }

    export default App