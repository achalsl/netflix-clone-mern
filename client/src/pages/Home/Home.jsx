
import React from 'react'
import Featured from '../../components/Featured/Featured'
import List from '../../components/List/List'
import Navbar from '../../components/Navbar/Navbar'

import './Home.scss'

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            {/* <img 
            width="100%"
            src="https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1440&w=2560" 
            alt="" 
            /> */}
            <Featured type="" />
            <List />
            <List />
            <List />
            <List />
        </div>
    )
}

export default Home
