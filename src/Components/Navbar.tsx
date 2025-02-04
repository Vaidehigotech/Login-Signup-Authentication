import { To, useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("authToken"); 

    const handleNavigation = (path: To) => {
        if (!isAuthenticated) {
            navigate("/login"); 
        }else {
            navigate(path); 
        }
    };

    return (
        <div className="bg-white h-screen rounded-lg">
            <div className="flex-col space-y-4 py-4 px-2">
                <button 
                    className="h-10 w-full bg-myColor text-white rounded-lg" 
                    onClick={() => handleNavigation("/dashboard")}
                >
                    Dashboard
                </button>
                <button 
                    className="h-10 w-full bg-myColor text-white rounded-lg" 
                    onClick={() => handleNavigation("/contact")}
                >
                    Contact
                </button>
            </div>
        </div>
    );
};

export default Navbar;
