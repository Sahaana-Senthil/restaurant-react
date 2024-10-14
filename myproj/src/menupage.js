import React, { useState } from "react";
import "./menu.css";

const menuData = {
    cafe: [
        {
            name: "Cappuccino",
            image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
            price: 250,
        },
        {
            name: "Black Coffee",
            image: "https://media.istockphoto.com/id/157528129/photo/mug-on-plate-filled-with-coffee-surrounded-by-coffee-beans.jpg?s=612x612&w=0&k=20&c=W_za-myO9QP_dimiJeZXsR4G2GHjrdo0RTyO3yVhopQ=",
            price: 150,
        },
        {
            name: "Chocolate Coffee",
            image: "https://img.freepik.com/free-photo/dark-chocolate-mocha-frothy-indulgence-saucer-generated-by-ai_188544-22903.jpg",
            price: 250,
        },
    ],
    lunch: [
        {
            name: "Grilled Chicken",
            image: "https://img.freepik.com/premium-photo/photo-grilled-chicken-legs-flaming-grill-with-grilled-vegetables-with-tomatoes-potatoes-pep_131346-430.jpg",
            price: 250,
        },
        {
            name: "Veggie Burger",
            image: "https://images.unsplash.com/photo-1661529515593-bba89f12e8de?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZlZ2dpZSUyMGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
            price: 200,
        },
        {
            name: "Pasta",
            image: "https://aartimadan.com/wp-content/uploads/2020/07/White-Sauce-Pasta.jpg",
            price: 220,
        },
    ],
    desserts: [
        {
            name: "Chocolate Cake",
            image: "https://img.freepik.com/premium-photo/slice-chocolate-cake-with-chocolate-icing-chocolate-chips-top_671352-3343.jpg",
            price: 180,
        },
        {
            name: "Ice Cream Sundae",
            image: "https://img.freepik.com/premium-photo/vanilla-ice-cream-cherry-chocolate-sundae-dessert-isolated-background-ai-generated-image_848903-2849.jpg",
            price: 150,
        },
        {
            name: "Cheesecake",
            image: "https://w0.peakpx.com/wallpaper/78/960/HD-wallpaper-cheesecake-with-berries-strawberries-blueberries-cakes-sweets-cheesecake.jpg",
            price: 200,
        },
    ],
};

function MenuPage() {
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) => prevCart.filter((item, index) => index !== indexToRemove));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Add items to proceed with checkout.");
            return;
        }
        setShowModal(true); 
    };

    const handleSubmitOrder = () => {
        if (name === "" || address === "") {
            alert("Please enter both name and address.");
            return;
        }

        alert(`Order placed successfully!\nName: ${name}\nAddress: ${address}\nTotal: ₹${calculateTotal()}`);
        setCart([]);  
        setShowModal(false);  
    };

    return (
        <div className="menu-page">
            <h1>Our Menu</h1>
            <div className="menu-section">
                <h2>Cafe</h2>
                <div className="menu-items">
                    {menuData.cafe.map((item, index) => (
                        <div className="menu-item" key={index}>
                            <img src={item.image} alt={item.name} />
                            <div className="menu-item-details">
                                <h3>{item.name}</h3>
                                <p>₹{item.price}</p>
                                <button onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="menu-section">
                <h2>Lunch</h2>
                <div className="menu-items">
                    {menuData.lunch.map((item, index) => (
                        <div className="menu-item" key={index}>
                            <img src={item.image} alt={item.name} />
                            <div className="menu-item-details">
                                <h3>{item.name}</h3>
                                <p>₹{item.price}</p>
                                <button onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="menu-section">
                <h2>Desserts</h2>
                <div className="menu-items">
                    {menuData.desserts.map((item, index) => (
                        <div className="menu-item" key={index}>
                            <img src={item.image} alt={item.name} />
                            <div className="menu-item-details">
                                <h3>{item.name}</h3>
                                <p>₹{item.price}</p>
                                <button onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cart-section">
                <h2>Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {cart.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <p>{item.name} - ₹{item.price}</p>
                                <button onClick={() => removeFromCart(index)}>Cancel</button>
                            </div>
                        ))}
                        <h3>Total: ₹{calculateTotal()}</h3>
                        <button onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Enter your details</h2>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Address:</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                        <button onClick={handleSubmitOrder}>Submit Order</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MenuPage;
