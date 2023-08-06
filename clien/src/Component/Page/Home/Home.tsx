import React from 'react'
import { IntroduceHome } from './ComponentHome/IntroduceHome'
import IntroduceApp from './ComponentHome/IntroduceApp'
import IntroduceLever from './ComponentHome/IntroduceLever'
import IntroExperience from './ComponentHome/IntroExperience'
import IntroBlog from './ComponentHome/IntroBlog'
import IntroEvaluate from './ComponentHome/IntroEvaluate'
import IntroConnec from './ComponentHome/IntroConnec'
import "./Home.scss"
const Home:React.FC = () => {
  return (
    <main className='container-main'>
      <IntroduceHome />
      <div className='w-[90%] line-midleware mx-auto max-w-[1600px]' />
      <IntroduceApp />
      <div className='w-[90%] line-midleware mx-auto max-w-[1600px]' />
      <IntroduceLever />
      <div className='w-[90%] line-midleware mx-auto max-w-[1600px]' />
      <IntroExperience />
      <div className='w-[90%] line-midleware mx-auto max-w-[1600px]' />
      <IntroBlog />
      <div className='w-[90%] line-midleware mx-auto max-w-[1600px]' />
      <IntroEvaluate />
      <div className='w-[90%] line-midleware mx-auto max-w-[1600px]' />
      <IntroConnec />
      <div className='w-[90%] line-midleware mx-auto max-w-[1600px]' />
    </main>
  )
}

export default Home