import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from '../../checkout/ContactData/ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail',
                    label: "E-mail"
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street address',
                    label: "Street address"
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP Code',
                    label: "Postal code"
                },
                value: ''
            },
            deliveryPeriod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }],
                    label: "Delivery Period"
                },
                value: 'fastest'
            }
        },
        loading: false
    }

    onChangedInput = (event, identifierId) => {
        const updatedformData = {...this.state.orderForm};
        const updatedFormElement = {...updatedformData[identifierId]};
        updatedFormElement.value = event.target.value;
        updatedformData[identifierId] = updatedFormElement;
        this.setState({orderForm: updatedformData});


       
    }

    onSubmitOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let formData = {};

        for(let identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            user_data: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                
                this.setState({ loading: false, purchasing: false });
                this.props.history.push("/");
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false });
            })
    }

    render() {
        let inputFieldArray = [];

        for (let key in this.state.orderForm) {
            inputFieldArray.push({ id: key, ...this.state.orderForm[key] });
        }

        let inputFieldData = inputFieldArray.map(input => (
            <Input
                elementType={input.elementType}
                elementConfig={input.elementConfig}
                changed={(event)=> this.onChangedInput(event,input.id)}/>
        ));
        let form = (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    {inputFieldData}


                    <Button btnType="Success" clicked={this.onSubmitOrder}>ORDER</Button>
                </form>
            </div>
        );
        if (this.state.loading) {
            form = (<Spinner />)
        }
        return (form)
    }
}

export default ContactData;