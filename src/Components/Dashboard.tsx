import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";
import Navbar from "./Navbar";
import { useEffect } from "react";
import axios from "axios";
import { logout } from "../Store/authSlice";

function Dashboard() {
    const dispatch = useDispatch();
    const handleLogout = () => {
            dispatch(logout());
        };
    const id = useSelector((state: RootState) => state.auth.id);
    const getUserById = async () => {
        try {
            const response = await axios.post("http://localhost:3000/dashboard", { id });
            console.log(id);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getUserById();
        }
    }, [id]);

    return (
        <div className="flex">
            <div className="w-1/4">
                <Navbar />
            </div>
            <div className="w-3/4 p-4 flex justify-between">
                <h1 className="font-bold text-2xl">Dashboard</h1>
                <button
                    type="button"
                    className="h-12 w-36 bg-blue-800 text-white rounded-md"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;