import { useNavigate } from "react-router";

const Logout = () =>
{
    const navigate = useNavigate();
    const handleLogin = () => navigate("/login");
    return(
        <div className="flex-col space-y-8">
            <button type ="button" className="px-4 py-2 bg-white text-lime-400 rounded-lg" onClick={handleLogin}>Login</button>
            <h1 className="text-6xl text-white">Logout</h1>
        </div>
    )
}

export default Logout