import Navbar from "./Navbar"
import UserDetails from "./UserDetails"

const Contact = () => {
    return (
        <div className="flex">
            <div className="w-1/4">
                <Navbar />
            </div>
            <div className="w-3/4 p-4">
                <UserDetails/>
            </div>
        </div>
    )
}

export default Contact