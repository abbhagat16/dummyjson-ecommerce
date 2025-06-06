import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function CartPage({ cartItems }) {
  const [cart, setCart] = useState(cartItems);
 const navigate= useNavigate();

 function goback() {
  navigate("/dashboard"); // Correct path
}

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Update cart data from localStorage for the user
    if (user?.username) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [];
      setCart(savedCart);
    }
  }, []);

  // Function to remove item from cart
  const removeFromCart = (id) => {
    // Filter out the product to remove
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); // Update state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage

    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.username) {
      localStorage.setItem(`cart_${user.username}`, JSON.stringify(updatedCart)); // Update user-specific cart
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart.length) return <h2>Your cart is empty.</h2>;

  return (
    <div className="dashboard">
    <div className='products-header'>
    <h2>Your Cart</h2>
    <button onClick={goback}>Go back</button>
    </div>
      <div className="products-grid">
        {cart.map((item) => (
          <div className="product-card" key={item.id}>
            <p>Product ID: {item.id} — Quantity: {item.quantity}</p>
            <img src={item.thumbnail} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="price">${item.price}</p>
            <p>{item.description}</p>
            {/* Button to remove the item */}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <p><strong>Total:</strong> ${total}</p>
    </div>
  );
}

