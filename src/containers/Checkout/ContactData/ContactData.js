import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'

import classes from './ContactData.css'


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingridients)

        this.setState({loading: true});
        const order = {
            ingridients: this.props.ingridients,
            price: this.props.totalPrice,
            customer: {
                name: 'Oleg SHaryk',
                address: {
                    street: 'Pecherska',
                    zipCode: '4135',
                    country: 'Ukraine'
                },
                email: 'docshark@gmail.com'
            },
            deliveryMetod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false })
            })

    }

    render(){

        let form = (<form>
                    <div className={classes.ContactDataRow}>
                        <input className={classes.Input} type="text" name="name" placeholder="your name" />
                    </div>
                    <div className={classes.ContactDataRow}>
                        <input className={classes.Input} type="email" name="email" placeholder="your email" />
                    </div>
                    <div className={classes.ContactDataRow}>
                        <input className={classes.Input} type="text" name="street" placeholder="your street" />
                    </div>
                    <div className={classes.ContactDataRow}>
                        <input className={classes.Input} type="text" name="postal" placeholder="your Postal Code" />
                    </div>
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>)

        if (this.state.loading) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                { form }
            </div>
        )
    }

}

export default ContactData