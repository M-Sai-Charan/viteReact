import { useProducts } from '../../contexts/ShoppingContext';
import './ShoppingCartList.css'
function ShoppingCartList() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalAmount,
    } = useProducts();
    return (
        <>
            <div className="cart-container">
                <h2 className="cart-title">Your Cart</h2>

                {cart.length === 0 ? (
                    <p className="cart-empty">Your cart is empty.</p>
                ) : (
                    <ul className="cart-items">
                        {cart.map((item: any) => (
                            <li key={item.id} className="cart-item">
                                <div className="cart-item-header">
                                    <h3 className="cart-item-title">{item.title}</h3>
                                    <span className="cart-item-qty">Qty: {item.quantity}</span>
                                    <div className="cart-qty-controls">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="qty-btn"
                                        >
                                            −
                                        </button>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="qty-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <h5 className="cart-item-price">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </h5>
                                <button
                                    className="delete-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    🗑️ Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="cart-total">
                    <strong>Total:</strong> ₹{totalAmount.toFixed(2)}
                </div>
            </div>
        </>
    );
}

export default ShoppingCartList;
