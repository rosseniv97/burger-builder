import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from '../../checkout/ContactData/ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading: false
    }

    onSubmitOrder = (event) => {
        event.preventDefault();
         this.setState({loading:true});
         const order = {
             ingredients: this.props.ingredients,
             price: this.props.totalPrice,
             customer: {
                 name: 'Rosen',
                 address: 'Sofia',
                 email: 'rosen@abv.bg'
             }
         }
         axios.post('/orders.json',order)
             .then(response=>{
                 console.log(response);
                // alert("Order was sent!");
                 this.setState({loading: false, purchasing: false});
                 this.props.history.push("/"); 
             })
             .catch(err=> {
                 this.setState({loading: false, purchasing: false});
             })
    }  

    render() {
        let form = (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder='Your name'/>
                    <input className={classes.Input} type="email" name="email" placeholder='Your email'/>
                    <input className={classes.Input} type="text" name="street" placeholder='Your street'/>
                    <input className={classes.Input} type="text" name="postal" placeholder='Your Code'/>
                    <Button btnType="Success" clicked={this.onSubmitOrder}>ORDER</Button>
                </form>
            </div>
        );
        if(this.state.loading){
            form = (<Spinner/>)
        }
        return (form)
    }
}

export default ContactData;