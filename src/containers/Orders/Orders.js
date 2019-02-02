import React, { Component } from 'react'
import axios from '../../axios-orders'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(response => {
                // console.log(response.data)
                const fetchedOrders = []
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({orders: fetchedOrders, loading: false,})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {
        // console.log(this.state)

        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingridients={order.ingridients}
                        price={order.price} 
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)