import axios from "axios";

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const HomePage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchAuth = async () => {
            const res = await axios.get("http://localhost:5001/api/me", {withCredentials: true});
            setIsAuthenticated(res.data.isAuthenticated);
            console.log(res.data.isAuthenticated);
        };
        fetchAuth();
    }, []);

    return isAuthenticated ? (
        <div>
            You are logged in.
            <a href="http://localhost:5001/logout">
                <button>Logout</button>
            </a>
        </div>
    ) : (
        <div>
            You are not logged in.
            <a href="http://localhost:5001/login">
                <button>Login</button>
            </a>
        </div>
    )
};

export default HomePage;