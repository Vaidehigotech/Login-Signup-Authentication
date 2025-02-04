import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { logout } from "../Store/authSlice";
import Navbar from "./Navbar";

function Dashboard() {
    const firstName = useSelector((state: RootState) => state.auth.firstName);
    const lastName = useSelector((state: RootState) => state.auth.lastName);
    const email = useSelector((state: RootState) => state.auth.email);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

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
