import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Redirect, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Service from "./components/Service";


const PrivateRoute = (props) =>{
    return <Route {...props}/>
}

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/signup" Component={SignUp} />
                <Route path="/dashboard" Component={Dashboard} />
                <Route path="/service/:id" Component={Service} />
                <Route path="/" Component={Home} />
            </Routes>
        </>
    );
}

export default App;
