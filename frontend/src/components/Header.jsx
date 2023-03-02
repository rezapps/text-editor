import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const user = null;

    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>Editor</Link>
            </div>
            <ul className="nav">
                <li>
                    <FaSignInAlt /> Logout
                </li>
                <li>
                    <FaSignInAlt /> Login
                </li>
                <li>
                    <FaUser /> Register
                </li>
            </ul>
        </header>
    );
};

export default Header;
