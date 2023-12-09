import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import {BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import Login from './Login/Login';
import Signup from './Signup/Signup'
import Dashboard from './Dashboard/Dashboard';
import RegistrationForm from './VehicleRegistrationForm/RegistrationForm';
import { useStateValue } from './StateManager/StateProvider';
import { API_URL } from './EnviormentVariables';


function App() {
  return (
    <Router>
        <div className="App">

          <Routes>

            <Route exact path="/login" element={<Login/>} />
            
            <Route exact path="/signup" element={<Signup/>} />

            <Route exact path="/" element={<><Header/><Home/></>} />

            <Route exact path="/dashboard" element={<Dashboard/>} />

            <Route exact path="/dashboard/package" element={<RegistrationForm/>} />
            
          </Routes>

        </div>
      
    </Router>

  );
}

export default App;

const GetUser = async (state) => {  
  let return_obj = state.user;
    const url = `${API_URL}/get-user`;
    const token = localStorage.getItem("token"); 

    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
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
    } catch (error) {
        console.error('Fetch error:', error);
    }
  return return_obj;
}

export { GetUser };
