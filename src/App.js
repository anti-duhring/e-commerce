import React, {useState,useEffect} from "react";
import { Products, Navbar, Cart, NotFound, Checkout } from './components'
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);

        setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity})

        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId)

        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();

        setCart(cart)
    }
    const refreshCart = async() => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart)
    }
    const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

            setOrder(incomingOrder);
            refreshCart();


        } catch(error){
            setErrorMessage(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart()
    }, [])


   
    return ( 
        <Router>
        <ThemeProvider theme={darkTheme}>
            <Navbar totalItems={cart.total_items} />
            <Routes>
                <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
                <Route exact path="/cart" 
                element={<Cart cart={cart} 
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
                />} />
                <Route exact path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </ThemeProvider>
        </Router>
     );
}
 
export default App;