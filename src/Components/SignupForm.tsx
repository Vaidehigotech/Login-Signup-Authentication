import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";


function SignupForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState(password);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("authToken");
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [navigate])
    const signupFormData = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }
        try {
            const response = await api.post("/signup", { email, firstName, lastName, password, confirmPassword });
            if (response.status === 201) {
                alert("Signup successful");
                navigate("/login");
            }
        } catch (error) {
            alert("already have account login");
            navigate("/login");
        }
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white w-96 p-6 rounded shadow-lg">
                <h2 className="text-center text-xl font-bold mb-4 text-myColor">Signup</h2>
                <form className="flex flex-col gap-2" onSubmit={signupFormData}>
                    <div className="mb-4 relative">
                    <MdEmail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full border border-gray-300 rounded p-2 pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 relative">
                    <FaUserAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            className="w-full border border-gray-300 rounded p-2 pl-10"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 relative">
                    <FaUserAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            className="w-full border border-gray-300 rounded p-2 pl-10"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 relative">
                    <FaUserAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter Password"
                            className="w-full border border-gray-300 rounded p-2 pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 relative">
                    <FaUserAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter Confirm Password"
                            className="w-full border border-gray-300 rounded p-2 pl-10"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-myColor text-white p-2 rounded"
                    >
                        Signup
                    </button>
                    <div className="flex gap-7">
                        <span>Already have an account</span>
                        <a href="/login" className="text-blue-900">Login</a>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default SignupForm;
