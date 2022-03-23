import { Link } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
    return ( 
        <div className="notfound-container">
            <p><h2>Error 404: Page not found</h2></p>
            <p><h3><Link to="/">Return to the homepage</Link></h3></p>
        </div>
     );
}
 
export default NotFound;