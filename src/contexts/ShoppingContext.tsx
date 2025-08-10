import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { SHOPPINGDATA } from '../shoppingData.js';
interface Product {
    id: string;
    title: string;
    price: number;
    quantity?: number;
    description: string
}
interface ProductContextType {
    products: Product[];
    cart: Product[];
    addToCart: (product: Product) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    totalAmount: number;
}
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
}
export function ProductProvider({ children }: ProductProviderProps) {
    const [products] = useState(SHOPPINGDATA);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const addToCart = (product: any) => {
        setCart((prevCartItems: any) => {
            const existingItem = prevCartItems.find(
                (item: any) => item.id === product.id
            );

            if (existingItem) {
                return prevCartItems.map((item: any) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCartItems, { ...product, quantity: 1 }];
        });
    };
    function increaseQuantity(id: number) {
        setCart((prevCart: any) =>
            prevCart.map((item: any) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    function decreaseQuantity(id: number) {
        setCart((prevCart: any) =>
            prevCart.map((item: any) =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
    }
    function removeFromCart(productId: any) {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item: any) => item.id !== productId);
            return updatedCart;
        });
    }
    useEffect(() => {
        const total = cart.reduce((acc: number, item: any) => {
            return acc + item.quantity * item.price;
        }, 0);
        setTotalAmount(total);
    }, [cart]);
    return (
        <ProductContext.Provider
            value={{
                products,
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                totalAmount,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

