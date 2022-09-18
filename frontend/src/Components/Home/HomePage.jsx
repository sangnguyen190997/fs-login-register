import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUsers, getAllUsers } from "../../redux/apiRequest";
import "./home.css";
import { loginSuccess } from "../../redux/authSlide";
import { createAxios } from "../../createInstance";



const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  const userList = useSelector((state) => state.users.users.allUser)
  const msg = useSelector((state) => state.users.msg)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  //DUMMY DATA
  const userData = [
    {
      username: "anhduy1202",
    },
    {
      username: "kelly1234",
    },
    {
      username: "danny5678",
    },
    {
      username: "kenny1122",
    },
    {
      username: "jack1234",
    },
    {
      username: "loi1202",
    },
    {
      username: "nhinhi2009",
    },
    {
      username: "kellynguyen1122",
    },
    
  ];

  const axiosJWT = createAxios(user, dispatch, loginSuccess)

  useEffect(() => {
    if(!user){
      navigate("/login")
    }
    if(user?.token){
        getAllUsers(user?.token, dispatch, axiosJWT)
    }
  },[])

  const handleDeleteUser = async (id) => {
    await deleteUsers(user?.token, dispatch, id, axiosJWT, navigate)
  }
 

  

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">{`Your role: ${user?.admin ? "Admin" : "User"}`}</div>
      <div className="home-userlist">
        {userList?.map((user, index) => {
          return (
            <div key={index} className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDeleteUser(user?.id)}> Delete </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{msg}</div>
    </main>
    
  );
};

export default HomePage;
