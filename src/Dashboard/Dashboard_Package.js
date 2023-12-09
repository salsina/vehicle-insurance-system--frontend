import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import './Dashboard_Inventory.css';
import PackageDashboard from '../Packages/PackageDashboard';

function Dashboard_Package({subscriptions}) {

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
                            <PackageDashboard item={item} />
                        </div>
                    ))}
                </div>
                </div>

    );

}

export default Dashboard_Package;
