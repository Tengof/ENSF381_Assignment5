import { Link } from "react-router-dom";
import './Header.css';
import logo from "../images/logo.jpg"

function Header(){
    return (
        <header className="header">
            <img src={logo} alt="LMS Logo" className="logo" />
            <nav>
                <Link to="/" className="navLink">Home</Link>
                <Link to="/CoursesPage" className="navLink">Courses</Link>
                <Link to="/LoginForm" className="navLink">Login</Link>
            </nav>
        </header>
    );
}

export default Header;
