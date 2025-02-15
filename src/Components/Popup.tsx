import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewUser } from "../Store/authSlice";

interface PopupProps {
    onclose: () => void;
}

function Popup({ onclose }: PopupProps) {
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/contact", {
                newName,
                newEmail,
            });
            if (response.status === 201) {
                dispatch(addNewUser({
                    name: response.data.name,
                    email: response.data.email
                }));
                onclose();
            }
        } catch (error) {
            console.error("User already exists", error);
            alert("User already exists");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-slate-200 w-96 p-6 rounded-lg shadow-lg relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add User</h2>
                    <button onClick={onclose} className="text-gray-600 hover:text-gray-900">
                        <IoMdClose className="text-2xl" />
                    </button>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="w-full border border-gray-300 rounded p-2"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="w-full border border-gray-300 rounded p-2"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white p-2 rounded"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Popup;
