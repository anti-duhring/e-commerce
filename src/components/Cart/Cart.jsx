import { Container, Typography, Button, Grid } from "@material-ui/core";
import CartItem from './CartItem/CartItem'
import useStyles from './styles';
import { Link } from "react-router-dom";

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const isEmpty = !cart.line_items?.length;
    const classes= useStyles();
    const EmptyCart = () => {return (
        <Typography variant="subtitle1">You have no items in your shopping cart, <Link to="/" className={classes.link}>click here and start to adding some!</Link></Typography>
    )}


    const FilledCart = () => {return (
        <div>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
            </div>
        </div>
    )}

    return ( 
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3">Your  cart</Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
     );
}
 
export default Cart;