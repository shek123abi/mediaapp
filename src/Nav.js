import React from 'react'
import{Link} from 'react-router-dom'
// import{Routes,Route} from 'react-router-dom'
// import Home from './Home'
// import Post from './Post'
// import About from './About'
const Nav = ({search,setSearch}) => {
  return (
 <nav className='Nav'>
    <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search">Search Item :</label>
        <input type="text"
        placeholder='search Item'
        value={search}
        id='search'
        onChange={(e)=>setSearch(e.target.value)}
        />
        </form>
        <ul>
   
            <li><Link to="/">Home</Link></li>
            <li><Link to="/post">Post</Link></li>
            <li><Link to="/about">About</Link></li>
            
            {/* <Routes>
              
                <Route path='/post'element={<Post/>}/>
                <Route path='/about'element={<About/>}/>

                
            </Routes> */}
        </ul>

        </nav>
  )
}

export default Nav