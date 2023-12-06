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
    const [title, setTitle] = useState(product?.title ? product.title : '');
    const [description, setDescription] = useState(product?.description ? product.description : '');
    const [price, setPrice] = useState(product?.price ? product.price : '');
    const [quantity, setQuantity] = useState(product?.quantity ? product.quantity : '');
    const [categories, setCategories] = useState([]);

    const [vehiclename, setVehiclename] = useState('');
    const [vehiclemodel, setVehiclemodel] = useState('');
    const [vehicletype, setVehicletype] = useState('');
    const [licensenumber, setLicensenumber] = useState('');
    const [registrationnumber, setRegistrationnumber] = useState('');
    const [purchasedate, setPurchasedate] = useState('');
    const [vehiclestatus, setVehiclestatus] = useState('');
    const [mileage, setMileage] = useState('');
    const [vehicleId, setVehiclestatusId] = useState('');
    const [packageId, setPackageId] = useState('');
    // const [selected_package, setSelected_package] = useState('');
    const [selected_package_num, setSelected_package_num] = useState('');

    let status = null;
    let selected_package = null;
    let [p, setPackages] = useState([]);
    let packages = [];

    // useEffect( async () => {
        // user = await GetUser(state);
        // dispatch({
        //     type: 'SET_USER_INFO',
        //     user: user
        // });

        // if(user?.role != 'company') {
        //     history.push({
        //         pathname: "/login",
        //         state: {massage: 'You have to login to your company account first!'}
        //     })
        // }

    // }, [])
    
    // useEffect(() => console.log(categories), [categories])
    // useEffect(() => console.log(selected_categories), [selected_categories])

    const handleResponse = (response) => {
        if (status == 200){
            get_packages();
        }
    }

    const register_vehicle = (event, vehiclename, vehiclemodel, vehicletype, licensenumber, registrationnumber, purchasedate, vehiclestatus, mileage) => {
        event.preventDefault();
        
        const url = `${API_URL}/register-vehicle`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: JSON.stringify({
                'userEmail': localStorage.getItem("userEmail"),
                'vehicleName': vehiclename, 
                'vehicleModel': vehiclemodel,
                'vehicleType': vehicletype,
                'licenseNumber': licensenumber,
                'registerationNumber': registrationnumber,
                'purchaseDate': purchasedate,
                'vehicleStatus': vehiclestatus,
                'mileage': mileage
            })
        })
        .then(resp => {
            status = resp.status;
            return resp.json();
        })
        .then(res => handleResponse(res))
        .catch(errors => console.log(errors));
    }


    const subscribe_package = (event, vehicleId, packageId) => {
        event.preventDefault();
        const url = `${API_URL}/subscribe-package`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: JSON.stringify({
                'userId' : "id",
                'vehicleId': vehicleId, 
                'packageId': packageId
            })
        })
        .then(resp => {
            status = resp.status;
            return resp.json();
        })
        .then(res => handleResponse(res))
        .catch(errors => console.log(errors));
        history("/dashboard")
    }

    function get_packages() {


        const url = `${API_URL}/get-packages`;
        const loadPackages = async () => { return await Promise.all(
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${state.token}`
                },
                body: JSON.stringify({
                    'userEmail': localStorage.getItem("userEmail"),
                    'vehicleId': vehicleId, 
                })
    
            })
            .then(resp => resp.json())
            .then(res => {
                packages = [...packages, res];
            })
            .catch(errors => console.log(errors))
        )};
        
        loadPackages().then(() => {
            setPackages(packages);
            console.log(packages);
        });

        document.getElementById("TitDescPriQuan-form").style.display = "none";
        document.getElementById("CatSubTag-form").style.display = "block";
        document.getElementById("header1").style.display = "none";
        document.getElementById("header2").style.display = "block";
    }   
  


    return (
        <div className="productForm">
            <div className="productForm_Container">

                <h1 id="header1">Please enter the vehicle information</h1>

                {/* <div className="TitDescPriQuanr" id="TitDescPriQuan-form"> */}
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
                        {/* <div className = "buttuns"> */}
                            <button className="productForm_Container_button1"type='submit' onClick={(e) => register_vehicle(e, vehiclename, vehiclemodel, vehicletype, licensenumber, registrationnumber, purchasedate, vehiclestatus, mileage)}>
                                Continue
                            </button>
                            <br></br>
                            <Link to="/dashboard">
                                <button className="productForm_Container_button1"type='submit' >Cancel</button>
                            </Link>
                        {/* </div> */}
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
                        {/* <th>Select</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            packages.map((item, index) => (
                                <Product
                                id="123"
                                packageName= {'first package'}
                                packageDescription={'annual'}
                                packagePrice={5000}
                                tenure={12}
                                />
                             ))
                        }                       

                    </tbody>
                    <select id="dropdown">
                        {
                        packages.map((item, index) => (
                                <Product
                                id="123"
                                packageName= {'first package'}
                                packageDescription={'annual'}
                                packagePrice={5000}
                                tenure={12}
                                />
                             ))
                        }                       
                       {
                        packages.map((item, index) => (
                            <option value={index}>{item.packageName}</option>
                            ))
                        }   
                        <option value="option2">Package 2</option>
                        <option value="option3">Package 3</option>
                    </select>
                    {selected_package = document.getElementById("dropdown")}
                    {/* {setSelected_package_num(selected_package.value)} */}
                    </table>


                    </div>


                    <button className="productForm_Container_button1"type='submit' onClick={(e) => subscribe_package(e, vehicleId, packages[selected_package_num-1].packageId)}>
                            submit
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
