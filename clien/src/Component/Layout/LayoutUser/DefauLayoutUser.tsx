import React from 'react'
import Header from '../DefauLayout/Header/Header'

const DefauLayoutUser = ({ children }: any) => {
    return (
        <div className='relative'>
            <Header/>
            {children}
        </div>
    )
}

export default DefauLayoutUser