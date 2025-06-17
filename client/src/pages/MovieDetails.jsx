import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'

const MovieDetails = () => {
  const {id} = useParams()
  const [shows , setshows] = useState(null)

  const getshow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    setshows({
      movie: show,
      dataTime: dummyDateTimeData
    })
  }

  useEffect(()=>{
    getshow()
  }, [id])

  return shows ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      
    </div>
  ) : (
    <div>Loading Data ......</div>
  )
}

export default MovieDetails
