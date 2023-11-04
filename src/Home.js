import React from 'react'
import Feed from './Feed'
const Home = ({posts}) => {
  return (
    <div className='Home'>
     {posts.length ?(
        <Feed
          posts={posts}
          />
     ):(<p>POGE IS EMPTY</p>
     )}
    </div>
  )
}   

export default Home