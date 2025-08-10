import { useProducts } from '../../contexts/ShoppingContext';
import './ShoppingList.css';

function ShoppingList() {
    const { products, addToCart } = useProducts();
    return (
        <ul className="product-grid">
            {products.map((product: any) => (
                <li key={product.id} className="product-card">
                    <strong>{product.title}</strong>
                    <p>₹{product.price.toFixed(2)}</p>
                    <button className="buy-btn" onClick={() => addToCart(product)}>
                        Buy Now
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ShoppingList;
