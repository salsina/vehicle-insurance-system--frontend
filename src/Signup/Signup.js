import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../EnviormentVariables';
import { useStateValue } from '../StateManager/StateProvider';
import './Signup.css';

function Signup() {
    var Image_Count = 1;
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [username, setUsername] = useState('');
    const [FirstName, setFirstName] = useState('');
    // const [adrTitle, setAdrTitle] = useState('');
    // const [address, setAdress] = useState('');

    // const [phoneTitle, setPhoneTitle] = useState('');
    // const [phone, setPhone] = useState('');

    // const [display, setDisplay] = useState('');
    const [LastName, setLastName] = useState('');
    const [role, setRole] = useState('customer');
    const [massage, setMassage] = useState('');
    const [phones, setPhones] = useState([{
        'id': 0,
        'title' : '',
        'phone': '',
        'display': false
    }])
    const [addresses, setAddresses] = useState([{
        'id': 0,
        'title': '',
        'address': '',
        'display': false
    }])
    const [images, setImages] = useState([{
        'img': null
    }]);
    let status = null;
    let addressData = []
    let phoneData = []

    const [state, dispatch] = useStateValue();

    //useEffect(() => console.log(status), [status])
    
    const setUser = (res) => {
        if(!res.token)
            setMassage(res.non_field_errors[0]);
        else {
            setMassage('');
            dispatch({
                type: 'SET_USER',
                token: res.token
            });
            localStorage.setItem('token', res.token);
            if(role == 'customer')
                history.push("/")
        }
    }
    
    const handleResponse = res => {
        if(status === 201) {
            setMassage('');
            const url = `${API_URL}/auth/`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username' : email,
                    'password':  password
                })
            })
            .then(resp => resp.json())
            .then(res => setUser(res))
            .catch(errors => console.log(errors));

            if(role == "company")
                openAdrPhoneForm();
        } else 
            setMassage(res.massage);
    }
    
    const signup = (event, FirstName,LastName, username, email, password, role) => {
        event.preventDefault();


        const url = `${API_URL}/api/signup/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'first_name' : FirstName,
                'last_name' : LastName,
                'username' : username,
                'email': email, 
                'password': password,
                'role': role
            })
        })
        .then(resp => {
            status = resp.status;
            return resp.json();
        })
        .then(res => handleResponse(res))
        .catch(errors => console.log(errors));
        
    }

    const add_address = async (url, addresses) => {
        
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: JSON.stringify(addresses)
        })
        .then(resp => {
            return resp.status;
        })
        .catch(errors => console.log(errors));
    }

    const add_phone = async (url, phones) => {
        
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: JSON.stringify(phones)
        })
        .then(resp => {
            return resp.status;
        })
        .catch(errors => console.log(errors));       
    }

    const add_address_Phone = async (event, addresses, phones) => {
        event.preventDefault();

        const address_url = `${API_URL}/api/profileupdate/contactinfo/address/`;
        const phone_url = `${API_URL}/api/profileupdate/contactinfo/phone/`;

        let response_status = [null, null];
        response_status[0] = await add_address(address_url, addresses);
        response_status[1] = await add_phone(phone_url, phones);
        if(response_status[0] === 201 && response_status[1] === 201)
            openImageForm();
    }

    const add_images = (event, images) => {
        event.preventDefault();
        console.log(images);

        const url = `${API_URL}/api/profileupdate/picture/`; 
        const formData = new FormData();
        formData.append(images);
        console.log(formData);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${state.token}`
            },
            body: formData
        })
        .then(resp => {
            console.log(resp.status);
            return resp.status;
        })
        .catch(errors => console.log(errors));
    }

    const add_new_address_form = (event) =>{
        setAddresses([...addresses, {
            'title': '',
            'address': '',
            'display': 'false'
        }])
    }

    const add_new_Phone_form = (event) =>{
        setPhones([...phones, {
            'title': '',
            'number': '', 
            'display': 'false'
        }])
    }

    const add_new_Image_form = (event) =>{
        setImages([...images, {
            'img': null
        }])
    }

    function openInitForm() {
        document.getElementById("init-form").style.display = "block";
        document.getElementById("AdrPhone-form").style.display = "none";
        document.getElementById("Image-form").style.display = "none";
    }

    function openAdrPhoneForm() {
        document.getElementById("init-form").style.display = "none";
        document.getElementById("AdrPhone-form").style.display = "block";
        document.getElementById("Image-form").style.display = "none";
    }

    function openImageForm() {
        document.getElementById("init-form").style.display = "none";
        document.getElementById("AdrPhone-form").style.display = "none";
        document.getElementById("Image-form").style.display = "block";
    }


    return (
        <div className="signup">
            
            <Link to='/'>
                <img className="signup__logo"
                src="http://pngimg.com/uploads/hummingbird/hummingbird_PNG66.png" 
                alt="img" />
            </Link>

            <div className="signup__container" id="init-form">
                <h1>Create Your VIS Account</h1>
                <h4>{massage}</h4>
                <form>

                    <h5>First name</h5>
                    <input className="signup__input"
                        placeholder="First-name"
                        type='text' 
                        value={FirstName} 
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <h5>Last name</h5>
                    <input className="signup__input"
                        placeholder="last-name"
                        type='text' 
                        value={LastName} 
                        onChange={e => setLastName(e.target.value)}
                    />

                    <h5>Username</h5>
                    <input className="signup__input"
                        placeholder="Username"
                        type='text' 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                    />

                    <h5>E-mail</h5>
                    <input className="signup__input"
                        placeholder="example@domain.com"
                        type='text' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input className="signup__input"
                        placeholder="password"
                        type='password' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />

                    <h5>Confirm password</h5>
                    <input className="signup__input"
                        placeholder="Confirm password"
                        type='password' 
                        value={cpassword} 
                        onChange={e => setCpassword(e.target.value)}
                    />
                    {(password === cpassword) ? null : <span>Password is not the same! <br/></span>}

                    
                    <button 
                        disabled={!(username && email && password && cpassword && (password === cpassword) )}
                        type='submit' 
                        className="signup__signInButton" 
                        onClick={(event) =>  signup(event, FirstName,LastName, username, email, password, role) }>
                            Signup
                    </button>
                </form>

                <p>
                    After signing-up you agree to VIS's conditions of use and Privacy Notice.
                </p>

                <Link to="/login">
                    <p>Already have an account?</p>
                </Link>

            </div>

            <div className="signup__getAdrPhone__container" id="AdrPhone-form">
                <div className="signup__getAdrPhone__container__header">
                    <h4>Store Address</h4>
                    <button 
                        type='submit' 
                        className="signup__getAdrPhone__container__addButton" 
                        onClick={(event) => add_new_address_form(event)}>
                            new address
                    </button>
                </div>

                <div className="signup__getAdrPhone__form__header">
                    <div className="sgapfh1">Title</div> 
                    <div className="sgapfh2">Address</div> 
                    <div className="sgapfh3">Dsiplay on store</div> 
                </div>

                { addresses.map( (item, index) => (
                    <form className="signup__getAdrPhone__form" key={index}>

                        <input className="signup__getAdrPhone__form__input1"
                            placeholder="title"
                            type='text' 
                            value={item.title} 
                            onChange={e => {
                                let temp = JSON.parse(JSON.stringify(addresses));
                                temp[index].title = e.target.value;
                                setAddresses(temp);
                            }}
                        />

                        <input className="signup__getAdrPhone__form__input2"
                            placeholder="address"
                            type='text' 
                            value={item.address} 
                            onChange={e => {
                                let temp = JSON.parse(JSON.stringify(addresses));
                                temp[index].address = e.target.value;
                                setAddresses(temp);
                            }}
                        />

                        <div className="signup__getAdrPhone__form__input2__checkbox">
                            <input  type="checkbox"  onChange={e => {
                                let temp = JSON.parse(JSON.stringify(addresses));
                                temp[index].display = e.target.checked ? 'true' : 'false';
                                setAddresses(temp);
                            }}></input>
                        </div>

                    </form>) 
                ) }


                <div className="signup__getAdrPhone__container__header">
                    <h4>Phone Numbers</h4>
                    <button 
                        type='submit' 
                        className="signup__getAdrPhone__container__addButton" 
                        onClick={(event) =>  add_new_Phone_form(event)}>
                            new Phone number
                    </button>
                </div>

                <div className="signup__getAdrPhone__form__header">
                    <div className="sgapfh1">Title</div> 
                    <div className="sgapfh2">Phone Number</div> 
                    <div className="sgapfh3">Dsiplay on store</div> 
                </div>

                { phones.map( (item, index) => (
                    <form className="signup__getAdrPhone__form">

                        <input className="signup__getAdrPhone__form__input1"
                            placeholder="title"
                            type='text' 
                            value={item.title} 
                            onChange={e => {
                                let temp = JSON.parse(JSON.stringify(phones));
                                temp[index].title = e.target.value;
                                setPhones(temp);
                            }}
                        />

                        <input className="signup__getAdrPhone__form__input2"
                            placeholder="Phone Number"
                            type='text' 
                            value={item.number} 
                            onChange={e => {
                                let temp = JSON.parse(JSON.stringify(phones));
                                temp[index].number = e.target.value;
                                setPhones(temp);
                            }}
                        />

                        <div className="signup__getAdrPhone__form__input2__checkbox">
                            <input  type="checkbox"  onChange={e => {
                                let temp = JSON.parse(JSON.stringify(phones));
                                temp[index].display = e.target.checked ? 'true' : 'false';
                                setPhones(temp);
                            }}></input>
                        </div>
                     
                    </form>
                ) ) }

                <button 
                    type='submit' 
                    className="signup__backButton" 
                    onClick={(event) => openInitForm()}>
                        Back
                </button>

                <button 
                    // disabled={!(username && email && password && cpassword && (password === cpassword) )}
                    type='submit' 
                    className="signup__signInButton" 
                    onClick={(event) => add_address_Phone(event, addresses, phones)}>
                        continue
                </button>

            </div>

            <div className="signup__getImage__container" id="Image-form">
                <div className="signup__getImage__form__header">
                    <h4>Store Images</h4>
                    <button 
                        type='submit' 
                        className="signup__getAdrPhone__container__addButton" 
                        onClick={(event) => add_new_Image_form(event)}>
                            add new image
                    </button>
                </div>

                { images.map( (item, index) => (
                    <form className="signup__getImage__form">
                        <label for="myfile">Store image {Image_Count}: </label>
                        <input type="file" id="myfile" name="myfile" onChange={e => {
                            console.log(e);
                            let temp = JSON.parse(JSON.stringify(images))
                            for(let i = 0; i < e.target.files.length; i++) {
                                temp[i].img = e.target.files[i];
                                console.log("fuck");
                            }
                            setImages(temp);
                        }}/><br></br>
                    </form>
                ) ) }

                <button 
                    type='submit' 
                    className="signup__backButton" 
                    onClick={(event) => openAdrPhoneForm()}>
                        Back
                </button>

                <button 
                    // disabled={!(username && email && password && cpassword && (password === cpassword) )}
                    type='submit' 
                    className="signup__signInButton" 
                    onClick={(event) => add_images(event, images)}
                    >
                        Signup
                </button>

            </div>

        </div>
    )
}

export default Signup
