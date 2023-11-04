import { useEffect, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import {format} from 'date-fns'
import About from "./About";
import{Routes,Route, useNavigate} from 'react-router-dom'
import Missing from "./Missing";
import PostPage from "./PostPage";
import Footer from "./Footer";
import api from "./api/posts"
import EditPost from "./EditPost";
import useWindowSize from "./useHooks/useWindowSize";

function App() {
  // const [deletes,handleDeletes]=useState('')
  const [search,setSearch]=useState('')
  const [searchResult,setSearchResult]=useState([])
  const [posts,setPosts]=useState([])
  const {width}=useWindowSize()

useEffect(()=>{
  const flteredResults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())||
  ((post.title).toLowerCase()).includes(search.toLowerCase()))
  setSearchResult(flteredResults.reverse())
},[posts,search])

const[postTitle,setPostTitle]=useState("")
const[postBody,setPostBody]=useState("")
const[editTitle,setEditTitle]=useState("")
const[editBody,setEditBody]=useState("")
const navigate=useNavigate()

const handleSubmit=async (e)=>{
  e.preventDefault();
  const id=posts.length ? posts[posts.length-1].id+1:1
  const time=format(new Date(),"MMMM dd, yyyy pp")
  const newPost={id,title:postTitle,time,body:postBody}
  try{
  const res=await api.post('./posts',newPost)
  const allPosts=[...posts,res.data]
  setPosts(allPosts)
  setPostTitle("")
  setPostBody("")
  navigate("/")
} catch(error){
  console.log(`Error:${error.message}`);
}
}

useEffect(()=>{
  const fetchPosts=async()=>{
    try {
      const res =await api.get('/posts');
      setPosts(res.data)
    } catch (error) {
      if(error.message){
        console.log(error.message.data);
        console.log(error.message.status);
        console.log(error.message.headers);
      }else{
        console.log(`Error :${error.message}`);
      }
      
    }
  }
  fetchPosts();

},[])
const handledelete= async (id)=>{
  try {
    await api.delete(`posts/${id}`)
    const postList=posts.filter(post=>post.id !==id)
    setPosts(postList)
    navigate('/')
  } catch (error) {
    console.log(`Error :${error.message}`);
  }
 
}

const handleEdit =async(id)=>{
  const time=format(new Date(),"MMMM dd, yyyy pp")
  const updatedPost={id,title:editTitle,time,body:editBody}
try {
  const res=await api.put(`/posts/${id}`,updatedPost)
  setPosts(posts.map(post=>post.id===id ? {...res.data}:post))
  setEditTitle("")
  setEditBody("")
  navigate("/")
} catch (error) {
  console.log(`Error :${error.message}`);
}
}


  return (
    <div className="App">
      <Header
      title="Abishek Chat App"
      width={width}
      />
      <Nav
      search={search}
      setSearch={setSearch}
      />
      
    <Routes>
      <Route path="/"element={
      <Home
      posts={searchResult}
      />}/>
      <Route path="/post">
      <Route index  element={
     <NewPost
     handleSubmit={handleSubmit}
     postTitle={postTitle}
     postBody={postBody}
     setPostBody={setPostBody}
     setPostTitle={setPostTitle}
     />}/>
     <Route path=":id" element={<PostPage posts={posts}handledelete={handledelete}/>}/>
    </Route>
<Route path="/edit/:id"element={<EditPost posts={posts}
      handleEdit={handleEdit}
      editBody={editBody}
      setEditBody={setEditBody}
      editTitle={editTitle}
      setEditTitle={setEditTitle}/>}/>

     <Route path="/about" element={
     <About/>}/>
     <Route path="*" element={
     <Missing/>}/>
     </Routes>
     <Footer/>
    </div>
  )
}

export default App