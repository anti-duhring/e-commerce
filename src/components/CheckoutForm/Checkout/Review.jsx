import { Typography, List, ListItem, ListItemText } from '@material-ui/core'
import './style.css';

const Review = ({checkoutToken}) => {
    console.log(checkoutToken)
    return ( 
        <div>
            <Typography variant="h6" className="form-title">Order summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem className="list-item" key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem className="list-item">
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className="subtitle-total">{checkoutToken.live.subtotal.formatted_with_symbol}</Typography>
                </ListItem>
            </List>
        </div>
     );
}
 
export default Review;