import { useState } from "react"
import TableData from "./TableData"
import Popup from "./Popup";


function UserDetails() {
    const [openForm,setOpenForm] = useState(false);
    const userForm = () =>
    {
        setOpenForm(true);
    }
    const closePopup = () =>
    {
        setOpenForm(false);
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl">Contact</h1>
                <button type="button" className="h-12 w-36 bg-blue-800 text-white rounded-md" onClick={userForm}>Add User</button>
            </div>
           {openForm &&  <Popup onclose={closePopup}/>}
            <TableData />
        </div>
    )
}
export default UserDetails


