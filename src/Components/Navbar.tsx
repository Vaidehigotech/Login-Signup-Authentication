import { To, useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("authToken");

    const handleNavigation = (path: To) => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            navigate(path);
        }
    };

    return (
        <div className="bg-blue-950 h-screen">
            <div className="flex-col space-y-4 px-4 py-6">
                <div className="flex gap-2">
                    <img src="Logo.png" alt="Logo" height={40} width={40} />
                    <p className="flex items-center text-xl text-white font-bold">Connectmore</p>
                </div>
                <button
                    className="h-10 w-full bg-blue-800 text-white rounded-md"
                    onClick={() => handleNavigation("/dashboard")}
                >
                    Dashboard
                </button>
                <button
                    className="h-10 w-full bg-blue-800 text-white rounded-md"
                    onClick={() => handleNavigation("/contact")}
                    >
                    Contact
                </button>
            </div>
        </div>
    );
};

export default Navbar;
