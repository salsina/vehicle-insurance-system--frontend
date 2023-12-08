import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useStateValue } from '../StateManager/StateProvider';
import { GetUser } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import Header_dashboard from '../Header/Header_dashboard';
import Dashboard_Inventory from './Dashboard_Inventory';
import Dashboard_Orders from './Dashboard_Orders';
import Dashboard_MyAccount from './Dashboard_MyAccount';

function Dashboard() {
    const history = useNavigate();
    const [state, dispatch] = useStateValue();
    const [user, setUser] = useState(null);

    let products = [];
    let [p, setProducts] = useState([]);
    const [componentnum, setComponentnum] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            let temp = await GetUser(state);
            setUser(temp);
        };

        fetchData();
    }, [state]);

    return (
        <div className="dashboard">
            <div className="dashboard__left">
                <div className="dashboard__left__header">
                    <Link to="/">
                        <img 
                            className="dashboard__left__logo"
                            src="http://pngimg.com/uploads/hummingbird/hummingbird_PNG66.png"
                            alt="img"
                        />
                    </Link>
                </div>

                <p> My Dashboard</p>
                <div className="dashboard__left__operations">

                    <div onClick={() => setComponentnum(1)}>
                        My insurance
                    </div>
                    
                    {/* <div onClick={() => setComponentnum(2)}>
                        Claim insurance
                    </div> */}

                </div>
                
                <p> My profile</p>
                <div className="dashboard__left__management">
                    <div onClick={() => setComponentnum(3)}>
                        My Account
                    </div>

                </div>
            </div>

            <div className="dashboard__right">

                <Header_dashboard User={user}/>

                {componentnum === 1 ? (<Dashboard_Inventory  products = {p}/>) : null}

                {componentnum === 2 ? (<Dashboard_Orders />) : null}

                {componentnum === 3 ? (<Dashboard_MyAccount />) : null}

            </div>
        </div>
    )
}

export default Dashboard
