import React from 'react'
import logo from "../../logo.png"
import { Link } from 'react-router-dom';
import { ImSearch } from "react-icons/im";

const Header = () => {
  
  return (
    <div className='header'>
     <img src={logo}  alt="logo"   />
     <div>
      <Link to="/tvshow">TV Shows</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/recent">Recently Added </Link>
      <Link to="/mylist">My List</Link>
      
     </div>
     <ImSearch />
    </div>
  )
}

export default Header