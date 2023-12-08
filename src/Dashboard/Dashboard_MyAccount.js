import React ,{useState, useEffect }from 'react'
import { useStateValue } from '../StateManager/StateProvider';
import { GetUser } from '../App';
import './Dashboard_MyAccount.css';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { API_URL } from '../EnviormentVariables';
import Product_dashboard from "../Products/Product_dashboard";

function Dashboard_MyAccount() {

    const [state, dispatch] = useStateValue();
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [CurrPassword, setCurrPassword] = useState('');
    const [user, setUser] = useState(null);
    let status = null;

    useEffect(() => {
        const fetchData = async () => {
            let temp = await GetUser(state);
            setUser(temp);
        };

        fetchData();
    }, [state]);
    
    return (
        <div className="dashboard_MyAccount">

            <div className="user-info-container">
                <div className="user-info-section">
                    <h3>Personal Information</h3>
                    <div className="user-info">
                        <div className="info-field">
                            <label>Name</label>
                            <span>{user ? user.name : '-----'}</span>
                        </div>
                        <div className="info-field">
                            <label>Email</label>
                            <span>{user ? user.email : '-----'}</span>
                        </div>
                        <div className="info-field">
                            <label>Date of Birth</label>
                            <span>{user ? user.dob : '-----'}</span>
                        </div>
                        <div className="info-field">
                            <label>Height</label>
                            <span>{user ? user.height : '-----'}</span>
                        </div>
                        <div className="info-field">
                            <label>Eye Color</label>
                            <span>{user ? user.eyeColor : '-----'}</span>
                        </div>
                        <div className="info-field">
                            <label>Blood Grouup</label>
                            <span>{user ? user.bloodGroup : '-----'}</span>
                        </div>                    </div>
                </div>

                <div className="user-info-section">
                    <h3>Contact Details</h3>
                    <div className="user-info">
                        <div className="info-field">
                            <label>Phone No.</label>
                            <span>{user ? user.phone : '-----'}</span>
                        </div>
                        <div className="info-field">
                            <label>Address</label>
                            <span>{user ? user.address : '-----'}</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="my-cars-container">
                <h2>My Cars</h2>
                {user && user['vehicles'].map(item => (
                    <div className="car-info">
                        <h3>{item.vehicleName}</h3>
                        <div className="car-details">
                            <div className="detail-item"><strong>Model:</strong> {item.vehicleModel}</div>
                            <div className="detail-item"><strong>Type:</strong> {item.vehicleType}</div>
                            <div className="detail-item"><strong>License Plate:</strong> {item.licenseNumberPlate}</div>
                            <div className="detail-item"><strong>Registration Number:</strong> {item.vehicleRegistrationNumber}</div>
                            <div className="detail-item"><strong>Status:</strong> {item.vehicleStatus}</div>
                            <div className="detail-item"><strong>Mileage:</strong> {item.mileage}</div>
                        </div>
                    </div>
                ))}
            </div>



        </div>


    )
}

export default Dashboard_MyAccount
