import './LoginPage.css';

import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const LoginPage = () => {
    const { login, logout, error, isLoading } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const logUser = async () => {
        await login(username, password);
        navigate("movies");

    }

    const handleLogout = () => {
        logout();
    }

    return (
        <main className="login-container">
            <h1>Movies API</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            {error && (
                <p className="error-message">{error}</p>
            )}

            <button className="btn-primary" onClick={logUser} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </main>
    )
}