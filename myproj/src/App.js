import React from "react";
import LandingPage from "./landingpage.js";
import JoinUsPage from "./joinuspage.js";
import TableReservationPage from "./table.js";
import MenuPage from "./menupage.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
    return (
        <Router>
            <nav className="nav">
            <b>
                    <h2>JUNGLE SPICE</h2>
                </b>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/join-us">Join Us</Link>
                    </li>
                    <li>
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li>
                        <Link to="/reservation">Table Reservation</Link>
                    </li>
                    {/* <li>
                        <Link to="/ContactPage">Contact Us</Link>
                    </li> */}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/reservation" element={<TableReservationPage />} />
            </Routes>
        </Router>
    );
}

export default App; 