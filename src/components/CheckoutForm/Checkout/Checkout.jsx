import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from "@material-ui/core";
import { useState, useEffect } from "react";
import useStyles from './styles';
import './style.css';
import AddressForm from './AddressForm';
import PaymentForm from "./PaymentForm";
import { commerce } from "../../../lib/commerce";
import { Link, useNavigate } from "react-router-dom";

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isFinished, setIsFinished] = useState(false)
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})

                setCheckoutToken(token)
                setIsLoading(false)
            }
            catch(error) {
                navigate('/');
            }
            
        }

        generateToken();
 

    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1) 
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1) 

    const next = (data) => {
        console.log(data)
        setShippingData(data);
        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}></Divider>
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )
    
    if(error){
        <>
            <Typography>Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout} />
        
    

    return ( 
        <div>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {isLoading && <Typography variant="h5" align="center"><CircularProgress /></Typography>}
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </div>
     );
}
 
export default Checkout;