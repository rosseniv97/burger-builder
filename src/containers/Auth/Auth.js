import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                label: "Email",
                activated: false,
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                label: "Password",
                activated: false,
                valid: false
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath!=="/") this.props.onSetAuthRedirectPath("/");
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

    onChangedInput = (event, controlName)=> {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                activated: true
            }
        }
        this.setState({controls: updateControls});
    }

    switchSignup = ()=>{
        this.setState({isSignup: !this.state.isSignup});
    }

    submitHandler = (event)=> {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render() {
        let inputFieldArray = [];
        for (let key in this.state.controls) {
            inputFieldArray.push({ id: key, ...this.state.controls[key] });
        }

        const Inputs = inputFieldArray.map(input => (
            <Input
                key={input.id} 
                elementType={input.elementType}
                elementConfig={input.elementConfig}
                label={input.label}
                invalid={!input.valid}
                activated={input.activated}
                changed={(event) => this.onChangedInput(event, input.id)} />
                

        ));

        const form = this.props.loading? <Spinner/>: Inputs;

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <div className={classes.Auth}>
                {this.props.isAuthenticated? <Redirect to={this.props.authRedirectPath}/>:null}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                  {form}  
                <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchSignup}>{this.state.isSignup?'SWICH TO SIGN IN':'SWICH TO SIGN UP'}</Button>

            </div>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, method)=> dispatch(actions.auth(email,password, method)),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token!==null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);