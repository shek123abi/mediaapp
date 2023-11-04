import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FcFullTrash } from "react-icons/fc";
import { GrEdit } from "react-icons/gr";


const PostPage = ({posts,handledelete}) => {
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id);
  return (
    <main className='PostPage'>
        <article className='post'>
            {post && 
                <>
                <h2>{post.title}</h2>
                <p className='postDate'>{post.time}</p>
                <p className='postBody'>{post.body}</p>
               <Link to={`/edit/${post.id}`}> <button className='editbutton'><GrEdit/></button></Link>
                <button onClick={()=>handledelete(post.id)}><FcFullTrash/></button>
                </>
}
        </article>
{
    !post && 
    <>
    <h2>Post not found</h2>
    <p>
        <Link to="/"> visit our Homepage</Link>
    </p>
    </>
}
    </main>
  
  )
}

export default PostPage