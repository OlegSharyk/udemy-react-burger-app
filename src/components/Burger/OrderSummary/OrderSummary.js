import React, { Component } from 'react'
import AuxContainer from '../../../HOC/AuxContainer/auxContainer'
import Button from '../../UI/Button/Button'

// TODO: Change to functional commponent
class OrderSummary extends Component {
    // componentWillUpdate() {
    //     console.log('[OrderSummary] will update')
    // }

    render() {
        const ingridientSummary = Object.keys(this.props.ingridients).map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}:</span>{' '}
                    {this.props.ingridients[igKey]}
                </li>
            )
        })

        return (
            <AuxContainer>
                <h2>Your order</h2>
                <p>A delicious burdger with the following ingridients:</p>
                <ul>{ingridientSummary}</ul>
                <p>
                    <strong>Total Price:</strong> {this.props.price.toFixed(2)}
                </p>
                <p>Continue to CHeckout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
                    Cancel
                </Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>
                    Continue
                </Button>
            </AuxContainer>
        )
    }
}

export default OrderSummary
