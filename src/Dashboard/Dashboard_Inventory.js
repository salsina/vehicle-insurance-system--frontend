import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Product_dashboard from '../Products/Product_dashboard';
import './Dashboard_Inventory.css';
import {GetUser} from "../App";
import {useStateValue} from "../StateManager/StateProvider";
function Dashboard_Inventory({subscriptions}) {
    const [state, dispatch] = useStateValue();


    useEffect( () => {
        let temp = GetUser(state);
    }, [])


    return (
        <div className="dashboard-inventory">
            <div className="dashboard-inventory-header">
                <h2>My Insurance Packages</h2>
                <Link to="/dashboard/product">
                    <button className="dashboard-inventory-header__request-btn">
                        Request Insurance Package
                    </button>
                </Link>
            </div>

            <div className="dashboard-inventory-names">
                <span>Name</span>
                <span>Description</span>
                <span>Price</span>
                <span>Tenure</span>
            </div>

            <div className="dashboard-inventory-products">
                {subscriptions?.map(item => (
                    <div className="dashboard-item" key={item.id}>
                        <Product_dashboard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Dashboard_Inventory
