import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
// pages for Outlet (react-router)
import HomePage from './Home'
// actual pages
import HomePageMain from './Home/Main'
import PageNotFound from './PageNotFound'

function AppWrapper({ children }: { children: ReactNode }) {
  return <div className="flex flex-col justify-between w-screen min-h-screen">{children}</div>
}

function App() {
  return (
    <ErrorBoundary>
      <AppWrapper>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content="xName" />
          <title>xName</title>
          <link rel="canonical" href="https://xname.xyz" />
        </Helmet>
        <Header />
        <div className="mb-auto">
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<HomePage />}>
              <Route index element={<HomePageMain />} />
            </Route>
            {
              // <Route path="/create" element={<CreatePage />}>
              //   <Route index element={<CreatePageMain />} />
              // </Route>
            }
          </Routes>
        </div>
        <Footer />
      </AppWrapper>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </ErrorBoundary>
  )
}

export default App
