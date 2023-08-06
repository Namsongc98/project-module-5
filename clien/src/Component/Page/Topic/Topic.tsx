import React from 'react'
import LeftTopic from './ComponentTopic/LeftTopic'
import RightTopic from './ComponentTopic/RightTopic'
import "./Topic.scss"

const Topic: React.FC = () => {
  return (
    <div className='flex gap-8 px-40 mt-5 '>
      <LeftTopic />
      <RightTopic />
    </div>
  )
}

export default Topic