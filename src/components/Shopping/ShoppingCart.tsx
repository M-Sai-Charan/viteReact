import { useState } from 'react';
import './ShoppingCart.css';
import { useProducts } from '../../contexts/ShoppingContext';
import ShoppingCartList from './ShoppingCartList';
function ShoppingCart() {
    const { cart } = useProducts();
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <div className="cart-container">
            <button onClick={toggleCart}> 🛒 My Cart ({cart.length})</button>
            {isOpen && (
                <div className="cart-dialog">
                    <div className="cart-dialog-content">
                        <button onClick={toggleCart}>Close</button>
                        <ShoppingCartList />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShoppingCart;
