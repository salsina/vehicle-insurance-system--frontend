import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import {BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import Login from './Login/Login';
import Signup from './Signup/Signup'
import Dashboard from './Dashboard/Dashboard';
import ProductForm from './ProductForm/ProductForm';
import { useStateValue } from './StateManager/StateProvider';
import { API_URL } from './EnviormentVariables';
import Profile from './Profile/Profile';


function App() {
  return (
    <Router>
        <div className="App">

          <Routes>

            <Route exact path="/login" element={<Login/>} />
            
            <Route exact path="/signup" element={<Signup/>} />

            <Route exact path="/" element={<><Header/><Home/></>} />

            <Route exact path="/dashboard" element={<Dashboard/>} />

            <Route exact path="/dashboard/product" element={<ProductForm/>} />
            
            <Route exact path="/profile" element={<Profile/>} />  

          </Routes>

        </div>
      
    </Router>

  );
}

export default App;

const GetUser = async (state) => {  
  let return_obj = state.user;
    const url = `${API_URL}/get-user`;
    const token = localStorage.getItem("token"); // This should be securely retrieved, e.g., from state, context, or storage

    try {
        const response = await fetch(url, {
            method: 'POST', // or 'POST', 'PUT', 'DELETE', etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Using Bearer token, but adjust if using a different scheme
            },
            body: JSON.stringify({
                'email': localStorage.getItem("userEmail")
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return_obj = data;
        console.log(data);
        // Handle the data...
    } catch (error) {
        console.error('Fetch error:', error);
        // Handle the error...
    }
  return return_obj;
}

export { GetUser };
