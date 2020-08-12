import React from 'react';
import { Link } from 'react-router-dom'

const IndexPage = () => {
    return (
        <div>
            <p><Link to="/">Index</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/register">Register</Link></p>
            <p className="background">This is index page</p>
        </div>
    )
}

export default IndexPage;
