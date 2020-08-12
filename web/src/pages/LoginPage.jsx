import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { URL_LOGIN } from '../constants/url';
import { UserContext } from '../contexts/UserContext';

const LoginPage = () => {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch(URL_LOGIN, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    email,
                    password
                }
            ),
        });
        const result = await response.json();
        if (result.accessToken) {
            setUser({
                accessToken: result.accessToken,
            });
        } else {
            console.error(result.error)
        }
    }

    useEffect(() => {
        console.log(user);
    }, [user])

    const handleChange = e => {
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        } else {
            setPassword(e.currentTarget.value);
        }
    }

    return (
        <div>
            <p><Link to="/">Index</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/register">Register</Link></p>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <input
                        value={email}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    <input
                        value={password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
