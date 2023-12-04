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

    let status = null;

    let [p, setPackages] = useState([]);
    let packages = [];

    useEffect( async () => {
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

    }, [])
    
    // useEffect(() => console.log(categories), [categories])
    // useEffect(() => console.log(selected_categories), [selected_categories])

    const handleResponse = (response) => {
        console.log(response);
        // if(status === 201 || status === 200) {
        //     history.push("/dashboard");
        //     alert(product ? "Product successfully updated!" : "Product successfully created!");
        // } else {
        //     history.push("/dashboard");
        //     alert("Somthing went wrong try again!");
        // }
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
                'userId' : title,
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
        get_packages();
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

    }

    function get_packages() {


        // const url = `${API_URL}/get-packages`;
        // const loadPackages = async () => { return await Promise.all(
        //     await fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Token ${state.token}`
        //         }
        //     })
        //     .then(resp => resp.json())
        //     .then(res => {
        //         packages = [...packages, res];
        //     })
        //     .catch(errors => console.log(errors))
        // )};
        
        // loadPackages().then(() => {
        //     setPackages(packages);
        //     console.log(packages);
        // });

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
                        <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>                       
                        <Product
                        id="123"
                        packageName= {'first package'}
                        packageDescription={'annual'}
                        packagePrice={5000}
                        tenure={12}
                        />

                    </tbody>
                    </table>


                    {/* { p.map( item => (

                    <Product
                        id="123"
                        title= {item.title}
                        needed_deposit={item.needed_deposit}
                        // image={item.images[0].img}
                        image = "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000"
                        rating={item.avg_ratings}
                        num_of_ratings = {item.num_of_ratings}
                        />

                    ) )} */}

                    </div>


                    <button className="productForm_Container_button1"type='submit' onClick={(e) => subscribe_package(e, vehicleId, packageId)}>
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
