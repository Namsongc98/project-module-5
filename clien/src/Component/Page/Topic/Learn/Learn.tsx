import React from 'react'
import { useParams } from 'react-router-dom'
import LeftLearn from './componentLearn/LeftLearn'
import RightLearn from './componentLearn/RightLearn'

const Learn: React.FC = () => {
    const { id } = useParams()
    console.log(id)
    return (
        <div className='flex relative'>
            <LeftLearn />
            <RightLearn />
        </div>
    )
}

export default Learn