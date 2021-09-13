import { ArrowDropDown, Notifications, SearchRounded } from '@material-ui/icons'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => window.onscroll = null
    }
    console.log(isScrolled)
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <Link to="/" className="link">
                        <span>Home</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span>TV Shows</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span>Movies</span>
                    </Link>
                    <Link to="/" className="link">
                        <span>New & Popular</span>
                    </Link>
                    <Link to="/" className="link">
                        <span>My List</span>
                    </Link>
                </div>
                <div className="right">
                    <SearchRounded className="icon" />
                    <span>KIDS</span>
                    <Notifications className="icon" />
                    <img 
                        src="https://images.pexels.com/photos/4974351/pexels-photo-4974351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt=""
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span>Settings</span>
                            <span>Logout</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar
