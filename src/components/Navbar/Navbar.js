import Sch_logo from "../../images/sch_logo.jpg";
import "./Navbar.css"
import { Link } from "react-router-dom";
import { auth, logout } from "../../firebase-config";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();


  const logoff = ()=>{
  navigate('/');
  logout()
  }
  return (

    <div className="navbar" id="navbar">
            <div className="navbar_content">
                  <>
                    <Link to="/admin">
                    <img src={Sch_logo} alt="" />
                  </Link>
                  <div className="nav_links">
                  <ul className="logout">
                    <li>
                      <p onClick={logoff}> Log Out</p></li>
                  </ul>
                </div></> 
            </div>
    </div>

  );
};

export default Navbar;
