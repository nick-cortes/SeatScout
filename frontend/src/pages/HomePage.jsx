import axios from "axios";

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const HomePage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchAuth = async () => {
            res = await axios.get("http://localhost:5001/api/me");
            setIsAuthenticated(res.isAuthenticated);
            console.log(res.isAuthenticated);
        };
        fetchAuth();
    }, []);

    return isAuthenticated ? (
        <div>
            You are logged in.
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