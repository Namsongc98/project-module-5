
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Public, Private, PrivateUser } from './Router'
import DefaultPublic from './Component/Layout'
import Admin from './Component/Page/Admin'

import React from 'react'
import { PrivateRouter } from './Router/PrivateRouter'
import NotFound from './Component/Page/NotFond/NotFound'
import Topic from './Component/Page/Topic/Topic'
import Learn from './Component/Page/Topic/Learn/Learn'
import PrivateUserRouter from './Router/PrivateUser'
import DefauLayoutUser from './Component/Layout/LayoutUser/DefauLayoutUser'
import { Layout } from 'antd'
const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className=''>
          <Routes>
            {Public.map((route, index) => {
              const Layout = DefaultPublic
              const Page = route.component
              return (< Route key={index} path={route.path} element={
                <Layout >
                  <Page />
                </Layout>} />)
            })}
            
            <Route path="*" element={<NotFound />} />
            <Route element={<PrivateUserRouter />}>
              {PrivateUser?.map((route, index) => {
                const Layout = DefauLayoutUser
                const Page = route.component
                return (<Route key={index} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>} />
                )
              })}
            </Route>
            <Route element={<PrivateRouter />}>
              {Private.map((route, index) => {
                const Layout = Admin
                const Page = route.component
                return (< Route key={index} path={route.path} element={
                  <Layout >
                    <Page />
                  </Layout>} />)
              })}
            </Route>
          </Routes>
        </div>
      </Router >

    </>
  )
}

export default App
