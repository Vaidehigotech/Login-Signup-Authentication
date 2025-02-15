import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

function TableData() {
    const users = useSelector((state: RootState) => state.auth.users);
    const firstName = useSelector((state: RootState) => state.auth.firstName);
    const lastName = useSelector((state: RootState) => state.auth.lastName);
    const email = useSelector((state: RootState) => state.auth.email);

    return (
        <div className="p-4">
            <table className="w-full border border-gray-400 rounded-sm">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2 text-left">Username</th>
                        <th className="border border-gray-400 px-4 py-2 text-left">E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-400 px-4 py-2">{firstName} {lastName}</td>
                        <td className="border border-gray-400 px-4 py-2">{email}</td>
                    </tr>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TableData;
