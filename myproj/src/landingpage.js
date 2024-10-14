import React from "react";
import "./landingpage.css";
import { useNavigate, Link } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();
    const handleJoinUsClick = () => {
        navigate('/join-us'); 
    };

    return (
        <div className="lp">
            {/* <nav className="nav">
                <b>
                    <h2>JUNGLE SPICE</h2>
                </b>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/join-us">Join Us</Link>
                    </li>
                    <li>
                        <Link to="/reservation">Table Reservation</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                </ul>
            </nav> */}

            <section id="home" className="hs">
                <h1>Welcome to Our JUNGLE SPICE </h1>
                <h2>--Taste the Serenity of the FOREST--</h2>
                <br />
                <h2>WE HAVE THE FACILITIES LIKE</h2> 
                <br />
                <h3>FOOD FACILITIES</h3>
                <h3>BEVERAGES SERVICES</h3>
                <h3>Food Arrangement</h3>
                <h3>PRIVATE DINING BOOKING</h3>
                <br />
                <div>
                    <button onClick={handleJoinUsClick}>CLICK HERE TO JOIN US</button>
                </div>
            </section>

            <section id="about" className="au">
                <h2>About Us</h2>
                <p>
                    # Feel your experience of eating in our ambiance at an affordable price.
                </p>
                <br />
            </section>

            <section id="contact" className="ct">
                <h2>Contact Us</h2>
                <p>Email: junglespice1985@gmail.com</p>
                <p>Mobile: +91 9358757489</p>
            </section>

            <section className="ab">
                <div className="im">
                    <img
                        src="https://assets.cntraveller.in/photos/65853d6a81a6e7c595da81f7/master/w_1600%2Cc_limit/Snapinsta.app_269499206_118326347363821_5590602720645946603_n_1080.jpg"
                        alt="Left Image"
                    />
                    <ul className="points">
                        <li>Exquisite dining experience</li>
                        <li>Fresh and local ingredients</li>
                        <li>Innovative cuisine</li>
                    </ul>
                </div>
                <div className="im">
                    <img
                        src="https://images.pexels.com/photos/903028/pexels-photo-903028.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="Center Image"
                    />
                    <ul className="points">
                        <li>Cozy and elegant ambiance</li>
                        <li>Family-friendly environment</li>
                        <li>Private dining options</li>
                    </ul>
                </div>
                <div className="im">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSizZUZAwOrzHELzhw57kOU1m_XEaxz1sop5w&s"
                        alt="Right Image"
                    />
                    <ul className="points">
                        <li>Professional and friendly staff</li>
                        <li>Customized menu options</li>
                        <li>Special events and catering</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
