import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    // console.log(`<h2>${post.body}</h2>`)
    <div className='post'>
      <Link to ={`post/${post.id}`}> <h2>{post.title}</h2>
            <p className='postDate'>{post.time}</p></Link>
            <p className='postBody'> {(post.body).length <=25 ? post.body : `${(post.body).slice(0,40)}....`}</p>
    </div>
  )
}

export default Post









