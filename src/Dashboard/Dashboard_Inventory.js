import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import Product_dashboard from '../Products/Product_dashboard';
import './Dashboard_Inventory.css';

function Dashboard_Inventory({subscriptions}) {


    return (

            <div className="dashboard-inventory">
                <div className="dashboard-inventory-header">
                    <h2>My Insurance Packages</h2>
                    <Link to="/dashboard/package">
                    <button className="dashboard-inventory-header__request-btn">
                        Request Insurance Package
                    </button>
                    </Link>
                </div>

                <div className="dashboard-inventory-names">
                    <span className='item'>Name</span>
                    <span className='item'>Description</span>
                    <span className='item'>Price</span>
                    <span className='item'>Tenure</span>
                    <span className='action'>Action</span>
                </div>

                <div className="dashboard-inventory-products">
                    {subscriptions?.map((item) => (
                        <div className="dashboard-item" key={item.id}>
                            <Product_dashboard item={item} />
                        </div>
                    ))}
                </div>
                </div>

    );

}

export default Dashboard_Inventory
