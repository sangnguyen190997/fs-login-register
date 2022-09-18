import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import localStorage from "redux-persist/es/storage";
import { createAxios } from "../../createInstance";
import { logOutUser } from "../../redux/apiRequest";
import { logOutSuccess } from "../../redux/authSlide";

import "./navbar.css";
const NavBar = () => {
  const user = useSelector(state => state.auth.login.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const axiosJWT = createAxios(user, dispatch, logOutSuccess)

  const handleLogout = () => {
    logOutUser(user?.token, dispatch, navigate,axiosJWT, user?.id)
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span>{user.username}</span> </p>
        <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
