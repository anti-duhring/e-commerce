import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

import logo from '../../assets/logo.png'
import useStyles from './styles';
import './styles.css';

const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();


    return ( 
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js"  className={classes.image} />
                            Patriots e-Shop
                    </Typography>
                    <div className={classes.grow}></div>
                    {location.pathname=='/' && <div className={classes.button}>
                        <IconButton component={Link} to="/cart" arial-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                 <ShoppingCart />
                            </Badge>
                         </IconButton>
                    </div>}
                </Toolbar>
            </AppBar>
        </div>
     );
}
 
export default Navbar;