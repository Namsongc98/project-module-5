import React from 'react'
import Header from "./DefauLayout/Header/Header.tsx"
import Footer from "./DefauLayout/Footer/Footer.tsx"

function DefaultPublic({ children }: { children: any }): React.ReactNode {
  return (
    <div className='relative h-auto'>
      <Header />
      {children}  
      <Footer />
    </div>
  )
}

export default DefaultPublic