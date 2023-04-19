import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import logo from '../images/grass.ico'

function Nav() {
  const auth = localStorage.getItem("user")
  const navigate = useNavigate();
  const logout = () => {  
    localStorage.clear()
    navigate('/SignUp')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info sticky-top">
        <a className="navbar-brand logo sticky-top" href='/'><img src={logo} alt="" style={{ width: '64px',height:"55px",top:"5px" }} /> </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">

          {auth ?

            <ul className="navbar-nav prvtitm">
              <li className="nav-item">
                <Link className='li-item' to={'/'}>Product</Link>
              </li>
              <li className="nav-item">
                <Link className='li-item' to={'/add'}>Add Product</Link>
              </li>
              {/* <li className="nav-item">
                <Link className='li-item' to={'/update'}>Update Product</Link>
              </li> */}

              <li className="nav-item">
                <Link className='li-item' to={'/profile'}>Profile</Link>
              </li>

              <li className="nav-item">
                <Link onClick={logout} className='li-item' to={'/SignUp'}>Logout (<span className='nameprf'>{JSON.parse(auth).name}</span>)</Link>
              </li>

            </ul>
            :
            <ul className="navbar-nav" id='nav-right'>
              <li className="nav-item">
                <Link className='li-item' to={'/SignUp'}>SignUp</Link>
                <Link className='li-item' to={'/login'}>Login</Link>
              </li>
            </ul>

          }

        </div>
      </nav >
    </div >
  )
}

export default Nav
