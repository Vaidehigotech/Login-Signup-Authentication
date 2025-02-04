import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import api from "../api/api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("authToken");
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [navigate])

    const loginFormData = async (e: React.FormEvent) => {
        e.preventDefault();
        const [firstName, lastName] = fullName.split(" ");
        if (!email || !firstName || !lastName) {
            alert("email and fullName are required");
            return;
        }
        try {
            const response = await api.post("/login", { email, firstName , lastName });
            console.log(response);
            if (response.status === 200) {
                dispatch(login({ firstName, lastName, email }));
                localStorage.setItem("authToken", "true");
                alert("Login successful");
                navigate("/dashboard");;
            }
            else {
                alert("Unexpected response. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("New user detected, please sign up first.");
            navigate("/signup");
        }
        setEmail("");
        setFullName("");
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white w-80 p-6 rounded shadow-lg">
                <h2 className="text-center text-xl font-bold mb-4 text-myColor">Login</h2>
                <form className="flex flex-col gap-2" onSubmit={loginFormData}>
                    <div className="mb-4 relative">
                        <MdEmail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full border border-gray-300 rounded p-2 pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <FaUserAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="w-full border border-gray-300 rounded p-2 pl-10"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-4 text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="/forget" className="text-myColor hover:underline">
                            Forget?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-myColor text-white p-2 rounded"
                    >
                        Login
                    </button>
                    <div className="flex gap-7">
                        <span>Don't have an account</span>
                        <a href="/signup" className="text-blue-900">Signup</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
