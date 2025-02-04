import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"
import { RootState } from "../Store/store"

const ProtectedRoute : React.FC = () => 
{
  const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated) || localStorage.getItem ("authToken") === "true";
  return isAuthenticated ? <Outlet/> : <Navigate to ="/login"/>
}
export default ProtectedRoute