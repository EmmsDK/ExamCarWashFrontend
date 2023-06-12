import React, {useState} from "react"
import facade from "./apiFacade.js";
import LogIn from "./components/LoginForm.jsx";
import LoggedIn from "./components/LoggedIn.jsx";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import GetWashingAssistants from "./components/GetWashingAssistants.jsx";
import GetBookings from "./components/GetBookings.jsx";
import WashingAssistantForm from "./components/WashingAssistantForm.jsx";


function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('setLoggedIn') || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {username: '', roles: ''});


    const logout = () => {
        facade.logout();
        setUser({username: "", roles: ""});
        setLoggedIn(false);
        localStorage.removeItem('setLoggedIn');
        localStorage.removeItem('user');
        window.location.replace('/');

    };

    const login = (user, pass) => {
        facade.login(user, pass).then(() => {
            const token = facade.readJwtToken(facade.getToken());
            setUser({username: token.username, roles: token.roles});
            setLoggedIn(true);
            localStorage.setItem('setLoggedIn', true);
            localStorage.setItem('user', JSON.stringify({username: token.username, roles: token.roles}));
        });
    }

    const Header = () => {
        const handleLogout = () => {
            logout();
        };

        return (
            <div>
                <ul className="header">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {loggedIn && (
                        <>
                            {user.roles === "admin" && (
                                <>
                                    <li>
                                        <NavLink to="/washing-assistant-form">Washing Assistant Form</NavLink>
                                    </li>
                                    {/*<li>
                                        <NavLink to="/bookingform">Booking Form</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/getallbookings">All guides</NavLink>
                                    </li>*/}
                                </>
                            )}

                            <li>
                                <NavLink to="/get-bookings">My Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile-page">Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/logout" onClick={handleLogout}>
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
                <br/>
            </div>
        );
    };


    const Home = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Home</h2>
                        {!loggedIn ? (
                            <LogIn login={login}/>
                        ) : (
                            <>
                                <h3>Here is your homepage</h3>
                                <GetWashingAssistants/>
                                {/*<GetBookings/>*/}
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const Logout = () => {
        return (
            <div>
                <h2>Logout</h2>
                <div>
                    <LoggedIn LoggedIn user={user} logout={logout} loggedIn={loggedIn}/>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>

                <Route path="/profile-page" element={<LoggedIn user={user} logout={logout} loggedIn={loggedIn}/>}/>

                {!loggedIn ? (
                    <Route path="/get-bookings" element={<Navigate to="/"/>}/>
                ) : (
                    <Route path="/get-bookings" element={<GetBookings/>}/>
                )}

                {user.roles === 'admin' && (
                    <Route exact path="/washing-assistant-form" element={<WashingAssistantForm/>}/>
                )}
            </Routes>
        </div>
    );
}

export default App;
