import React from 'react';
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    return (
        <div>
            <p><Link to="/">Index</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/register">Register</Link></p>
            <p className="background">This is register page</p>
        </div>
    )
}

export default RegisterPage;
