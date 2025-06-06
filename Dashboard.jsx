import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function Dashboard({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart];
    const existingProduct = newCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // If the product is already in the cart, increase its quantity
    } else {
      newCart.push({ ...product, quantity: 1 }); // Otherwise, add new product
    }

    // Update cart state
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage

    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.username) {
      localStorage.setItem(`cart_${user.username}`, JSON.stringify(newCart)); // Save user-specific cart
    }
  };

  return (
    <div className="dashboard">
     
     <div className='products-header'> <h2>All Products</h2>
      
     <Link to="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
     🛒
  <span style={{
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px'
  }}>
     {cart.length}
  </span>
</Link>

        <button onClick={handleLogout}>Logout</button>

      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}


