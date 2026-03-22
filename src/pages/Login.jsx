import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!username.trim()) return;

        localStorage.setItem("isAuthenticated", "true");

        onLogin();
        navigate("/");
    }

    return (
        <main>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => 
                        setUsername(e.target.value)
                    }
                />
                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default Login;