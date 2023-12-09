import React, { useEffect } from 'react'
import { GetUser } from '../App'
import Package from '../Packages/Package'
import { useStateValue } from '../StateManager/StateProvider'
import './Home.css'
import Header from '../Header/Header'

function Home() {
    const [state, dispatch] = useStateValue()
    
    return (
        <div className="home">
            <div className="home__container">
                <div className="home__describe">
                    Vehicle Insurance System
                </div>
            </div>
        </div>
    )
}

export default Home
