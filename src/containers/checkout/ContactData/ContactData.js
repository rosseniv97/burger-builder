import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from '../../checkout/ContactData/ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import * as actionTypes from '../../../store/actions';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                label: "Name",
                activated: false,
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail',

                },
                value: '',
                validation: {
                    required: true
                },
                label: "E-mail",
                activated: false,
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street address',

                },
                value: '',
                validation: {
                    required: true
                },
                label: "Street address",
                activated: false,
                valid: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP Code',

                },
                value: '',
                validation: {
                    required: true,
                    required_length: true
                },
                label: "Postal code",
                activated: false,
                valid: false
            },
            deliveryPeriod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }],

                },
                label: "Delivery Period",
                value: 'fastest'
            }
        },
        isFormValid: false,
        loading: false
    }

    checkValidity = (value, rules) => {
        var isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.required_length && isValid) {
            isValid = value.length === 4;
        }
        return isValid;
    }

    onChangedInput = (event, identifierId) => {
        const updatedformData = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedformData[identifierId] };
        let isFormValid = false;
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.activated = true;
        updatedformData[identifierId] = updatedFormElement;
        for (let identifier in updatedformData) {
            if (updatedformData[identifier].valid === false) {
                isFormValid = false;
                break;
            } else {
                isFormValid = true;
            }
        }
        this.setState({ orderForm: updatedformData, isFormValid: isFormValid });
    }

    onSubmitOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let formData = {};

        for (let identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            user_data: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);

                this.setState({ loading: false, purchasing: false });
                this.props.clearSentData();
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
                key={input.id}
                elementType={input.elementType}
                elementConfig={input.elementConfig}
                label={input.label}
                invalid={!input.valid}
                activated={input.activated}
                changed={(event) => this.onChangedInput(event, input.id)} />
        ));
        let form = (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    {inputFieldData}
                    <Button btnType="Success" clicked={this.onSubmitOrder} disabled={!this.state.isFormValid}>ORDER</Button>
                </form>
            </div>
        );
        if (this.state.loading) {
            form = (<Spinner />)
        }
        return (form)
    }
}
const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        clearSentData: () => dispatch ({type: actionTypes.CLEAR_STATE})
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactData);