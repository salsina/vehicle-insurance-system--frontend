import React from 'react';
import './Package_dashboard.css'; // Assuming you have a CSS file for styling
import { API_URL } from '../EnviormentVariables';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useStateValue } from '../StateManager/StateProvider';


const PackageDashboard = ({ item }) => {
    const history = useNavigate();
  const { packageName, packageDescription, packagePrice, tenure } = item;

    const handleClaimInsurance = (event) => {
        event.preventDefault();

        const claim = async () => {
            const url = `${API_URL}/claim-insurance`;

            const token = localStorage.getItem("token"); 

            try {
                const response = await fetch(url, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify({
                        'userEmail': localStorage.getItem("userEmail"),
                        'subscriptionId': item.id, 
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                Swal.fire({
                    icon: 'success',
                    title: 'Claim Successful',
                    text: 'Your insurance claim has been processed successfully!',
                  });
                  window.location.reload();


            } catch (error) {
                console.error('Fetch error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Claim Failed',
                    text: 'There was an error processing your insurance claim. Please try again.',
                  });
            }
        };

        claim();

      };

    return (
        <div className="product-card">
            <h3 className="product-title">{item.packageName}</h3>
            <p className="product-description">{item.packageDescription}</p>
            <div className="product-info">
                <span className="info-label"></span>
                <span className="info-value">${item.packagePrice}</span>
            </div>
            <div className="product-info">
                <span className="info-label"></span>
                <span className="info-value">{item.tenure} months</span>
            </div>
            {item.claimedOn === null && (
                <button className="claim-insurance-btn" onClick={handleClaimInsurance}>
                Claim Insurance
            </button>
            )}
            {item.claimedOn !== null && (
                <button className="claim-insurance-btn-red">
                Insurance Claimed
            </button>
            )}
        </div>
    );
};

export default PackageDashboard;

