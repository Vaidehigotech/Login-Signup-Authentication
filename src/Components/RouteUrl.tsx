import { Routes, Route } from "react-router";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Contact from "./Contact";
// import Logout from "./Logout";

const RouteUrl = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route element={<ProtectedRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          {/* <Route path="/logout" element={<Logout/>} /> */}
        </Routes>
    </div>
  )
}

export default RouteUrl