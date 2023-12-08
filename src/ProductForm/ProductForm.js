import React,{useState, useEffect} from 'react';
import { GetUser } from '../App';
import { useStateValue } from '../StateManager/StateProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../EnviormentVariables';
import './ProductForm.css'
import Product from '../Products/Product';
import AddBoxIcon from '@material-ui/icons/AddBox';
function ProductForm(props) {
    let user;
    const history = useNavigate();
    const location = useLocation();
    const [state, dispatch] = useStateValue();
    let product = location?.state?.product ? location.state.product : null;

    const [vehiclename, setVehiclename] = useState('');
    const [vehiclemodel, setVehiclemodel] = useState('');
    const [vehicletype, setVehicletype] = useState('');
    const [licensenumber, setLicensenumber] = useState('');
    const [registrationnumber, setRegistrationnumber] = useState('');
    const [purchasedate, setPurchasedate] = useState('');
    const [vehiclestatus, setVehiclestatus] = useState('');
    const [mileage, setMileage] = useState('');
    const [latestVehicleId, setLatestVehicleId] = useState('');

    
    let status = null;
    let [packages, setPackages] = useState([]);

    const register_vehicle = (event, vehiclename, vehiclemodel, vehicletype, licensenumber, registrationnumber, purchasedate, vehiclestatus, mileage) => {
        event.preventDefault();
        
        const fetchData = async () => {
            const url = `${API_URL}/register-vehicle`;
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
                            'vehicleName': vehiclename,
                            'vehicleModel': vehiclemodel,
                            'vehicleType': vehicletype,
                            'licenseNumber': licensenumber,
                            'vehicleRegisterationNumber': registrationnumber,
                            'purchaseDate': purchasedate,
                            'vehicleStatus': vehiclestatus,
                            'mileage': mileage
                        })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                get_packages();
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }

    const subscribe_package = (event, vehicleId, packageId) => {
        event.preventDefault();

        const subscribe = async () => {
            const url = `${API_URL}/subscribe-package`;

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
                        'vehicleId': vehicleId, 
                        'packageId': packageId
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                history("/dashboard")

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        subscribe();

    }

    async function get_packages() {


        const url = `${API_URL}/get-packages`;
        let temp = await GetUser(state);
        let temp2 = temp.vehicles.at(-1)['id'];
        setLatestVehicleId(temp2);
        const loadPackages = async () => {
            const url = `${API_URL}/get-packages`;

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
                        'vehicleId': temp2,
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setPackages(data);

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };


        loadPackages();

        document.getElementById("TitDescPriQuan-form").style.display = "none";
        document.getElementById("CatSubTag-form").style.display = "block";
        document.getElementById("header1").style.display = "none";
        document.getElementById("header2").style.display = "block";
    }   
  
        const [selectedPackageNum, setSelectedPackageNum] = useState(null);
      
        const handlePackageSelect = (e) => {
          setSelectedPackageNum(e.target.value);
        };  


    return (
        <div className="productForm">
            <div className="productForm_Container">

                <h1 id="header1">Please enter the vehicle information</h1>

                    <form id="TitDescPriQuan-form">
                        <input 
                            placeholder="Vehicle Name"
                            type='text' 
                            value={vehiclename} 
                            onChange={(e) => setVehiclename(e.target.value)}
                        />
                        <input 
                            placeholder="Vehicle Model"
                            type='text' 
                            value={vehiclemodel} 
                            onChange={(e) => setVehiclemodel(e.target.value)}
                        />
                        <input 
                            placeholder="Vehicle Type"
                            type='text' 
                            value={vehicletype} 
                            onChange={(e) => setVehicletype(e.target.value)}
                        />
                        <input 
                            placeholder="License Number"
                            type='text' 
                            value={licensenumber} 
                            onChange={(e) => setLicensenumber(e.target.value)}
                        />
                        <input 
                            placeholder="Registration Number"
                            type='text' 
                            value={registrationnumber} 
                            onChange={(e) => setRegistrationnumber(e.target.value)}
                        />
                        <input 
                            placeholder="Purchase Date"
                            type='text' 
                            value={purchasedate} 
                            onChange={(e) => setPurchasedate(e.target.value)}
                        />
                        <input 
                            placeholder="Vehicle Status"
                            type='text' 
                            value={vehiclestatus} 
                            onChange={(e) => setVehiclestatus(e.target.value)}
                        />
                        <input 
                            placeholder="Mileage"
                            type='integer' 
                            min ="0"
                            value={mileage} 
                            onChange={(e) => setMileage(e.target.value)}
                        />
                            <button className="productForm_Container_button1"type='submit' onClick={(e) => register_vehicle(e, vehiclename, vehiclemodel, vehicletype, licensenumber, registrationnumber, purchasedate, vehiclestatus, mileage)}>
                                Continue
                            </button>
                            <br></br>
                            <Link to="/dashboard">
                                <button className="productForm_Container_button1"type='submit' >Cancel</button>
                            </Link>
                    </form>


                <form id="CatSubTag-form" className="productForm__CatSubTag">
                <h1 id="header2">Please select the insurance package</h1>
                    

                    <div className="productForm__CatSubTag__options">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Tenure</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packages?.map((item, index) => (
                            <Product
                            key={item.id}
                            id={item.id}
                            packageName={item.packageName}
                            packageDescription={item.packageDescription}
                            packagePrice={item.packagePrice}
                            tenure={item.tenure}
                            />
                        ))}
                        </tbody>
                    </table>

                    <label htmlFor="dropdown">Select a Package:  </label>
                    <select id="dropdown" onChange={handlePackageSelect} value={selectedPackageNum || ''}>
                        <option value="" disabled>--</option>
                        {packages?.map((item, index) => (
                        <option key={item.id} value={index}>
                            {item.packageName}
                        </option>
                        ))}
                    </select>

                    {selectedPackageNum !== null && (
                        <div className="productForm__CatSubTag__options">
                        <h3>Selected Package Details:</h3>
                        <p>Name: {packages[selectedPackageNum].packageName}</p>
                        <p>Description: {packages[selectedPackageNum].packageDescription}</p>
                        <p>Price: {packages[selectedPackageNum].packagePrice}</p>
                        <p>Tenure: {packages[selectedPackageNum].tenure}</p>
                        </div>
                    )}

                    </div>


                    <button className="productForm_Container_button1"type='submit' onClick={(e) => subscribe_package(e, latestVehicleId, packages[selectedPackageNum].id)}>
                            Submit
                    </button>
                    <br></br>
                    <Link to="/dashboard">
                        <button className="productForm_Container_button1"type='submit' >Cancel</button>
                    </Link>

                </form>

            </div>
        </div>
    )
}

export default ProductForm
