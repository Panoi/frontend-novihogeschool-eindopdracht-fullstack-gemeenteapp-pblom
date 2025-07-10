import {Link} from "react-router-dom";
import "./NavBar.css"
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../button/Button.jsx";


function NavBar() {

    const {isAuth, logout, user} = useContext(AuthContext);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-home">
                GemeenteApp
            </Link>
            <ul className="navbar-list">
                {!isAuth ? (
                    <>
                        <li><Link to="/inloggen">Login</Link></li>
                        <li><Link to="/registreren">Registreren</Link></li>
                    </>
                ) : (
                    <>
                        {user?.authorities?.includes("ROLE_RESIDENT") && (
                            <li><Link to="/voorstel-aanmaken">Voorstel aanmaken</Link></li>
                        )}

                        {(user?.authorities?.includes("ROLE_RESIDENT") || user?.authorities?.includes("ROLE_MUNICIPALITY")) && (
                            <li><Link to="/voorstellen">Voorstellen</Link></li>
                        )}

                        {user?.authorities?.includes("ROLE_ADMIN") && (
                            <li><Link to="/gemeente">Gemeente</Link></li>
                        )}

                        <li><Link to="/profiel">Profiel</Link></li>

                        <li>
                            <Button
                                type="button"
                                onClickEffect={logout}
                                buttonFunction="Afmelden"
                                className="button-navbar"
                            />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
