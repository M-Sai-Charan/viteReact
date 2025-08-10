import { ProductProvider } from '../../../src/contexts/ShoppingContext';
import ShoppingHome from './ShoppingHome';
import './Shopping.css'
import ShoppingCart from './ShoppingCart';
function Shopping() {

    return (
        <>
            <ProductProvider>
                <div className="app-container">
                    <header className="app-header">
                        <h1>E-Commerce</h1>
                        <div className="cart-data">
                            <ShoppingCart />
                        </div>
                    </header>
                    <hr />
                    <ShoppingHome />
                </div>
            </ProductProvider>
        </>
    )
}

export default Shopping
