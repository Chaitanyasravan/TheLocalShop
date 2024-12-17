// frontend/app/checkout/page.js
import { useEffect, useState } from 'react';
import api from '../utils/api';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await api.get('/cart');
      setCart(response.data.products);
      const total = response.data.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setTotalAmount(total);
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token); // Requires jwt-decode library
    const userId = decodedToken.id;
  
    try {
      await api.post('/orders/checkout', { userId }); // Updated endpoint
      alert('Order placed successfully!');
    } catch (error) {
      console.error(error);
      alert('Checkout failed.');
    }
  };
  
  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cart.map(item => (
          <li key={item.product._id}>{item.product.name} x {item.quantity}</li>
        ))}
      </ul>
      <h3>Total: ${totalAmount}</h3>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
