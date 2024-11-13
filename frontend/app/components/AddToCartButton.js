// app/components/AddToCartButton.js
import api from '../utils/api';

const AddToCartButton = ({ productId }) => {
  const addToCart = async () => {
    try {
      await api.post('/cart/add', { productId, quantity: 1 });
      alert('Added to cart!');
    } catch (error) {
      console.error(error);
      alert('Failed to add to cart.');
    }
  };

  return (
    <button
      onClick={addToCart}
      className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
