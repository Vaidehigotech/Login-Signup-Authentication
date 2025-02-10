import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { logout } from "../Store/authSlice";
import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";

function Dashboard() {
    const firstName = useSelector((state: RootState) => state.auth.firstName);
    const lastName = useSelector((state: RootState) => state.auth.lastName);
    const email = useSelector((state: RootState) => state.auth.email);
    const id = useSelector((state: RootState) => state.auth.id); 
    const dispatch = useDispatch();
    const [userData,setUserData] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
    };

    const getUserById = async () => {
        try {
            const response = await fetch("http://localhost:3000/dashboard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }), 
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            console.log("sending id to user",id);
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        console.log("the id",id);
        if (id) {
            getUserById();
        } 
    }, [id]); 

    return (
        <div className="flex py-4 px-6 gap-14">
            <div className="w-1/4">
                <Navbar />
            </div>
            <div className="flex w-3/4 justify-between py-9">
                <div className="flex-col">
                    <h4 className="text-xl text-myColor">Email - {email}</h4>
                    <h1 className="text-4xl text-myColor">Welcome {firstName} {lastName}</h1>
                </div>
                <button
                    type="button"
                    className="h-10 px-4 py-2 bg-myColor text-white rounded-lg"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;