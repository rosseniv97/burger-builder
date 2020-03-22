import React, { Component } from 'react';
import Order from '../components/Order/Order';
import axios from '../axios-orders';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json').then(result =>{
            debugger;
            var fetchedOrders = [];
            for(let key in result.data) {
                fetchedOrders.push({
                    ...result.data[key],
                    id: key
                });
            }
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err=>{
            this.setState({loading: false});
        });
    }
    render() {
        return (
            <div>
               {this.state.orders.map(order =>
                ( <Order key={order.id} data={order}/>))}
            </div>

        );
    }
};

export default withErrorHandler(Orders, axios);