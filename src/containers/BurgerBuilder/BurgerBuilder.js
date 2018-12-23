import React, { Component } from 'react'
import AuxContainer from '../../HOC/AuxContainer/auxContainer'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = {}
    // }

    state = {
        ingridients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
    }

    updatePutchaseState = ingridients => {
        // const ingridients = {
        //     ...this.state.ingridients,
        // }

        const sum = Object.keys(ingridients)
            .map(igKey => {
                return ingridients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

        this.setState({ purchaseable: sum > 0 })
    }

    addIngridientHandler = type => {
        const oldCount = this.state.ingridients[type]
        const updatedCount = oldCount + 1
        const updatedIngridients = {
            ...this.state.ingridients,
        }
        updatedIngridients[type] = updatedCount

        const priceAddition = INGRIDIENTS_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({ totalPrice: newPrice, ingridients: updatedIngridients })
        this.updatePutchaseState(updatedIngridients)
    }

    removeIngrientHandler = type => {
        const oldCount = this.state.ingridients[type]
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngridients = {
            ...this.state.ingridients,
        }
        updatedIngridients[type] = updatedCount

        const priceDeduction = INGRIDIENTS_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({ totalPrice: newPrice, ingridients: updatedIngridients })
        this.updatePutchaseState(updatedIngridients)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        alert('you continue')
    }

    render() {
        const { ingridients } = this.state

        const disableInfo = {
            ...this.state.ingridients,
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        // {salad:true, meat: false, chease: true, bacon: true}

        return (
            <AuxContainer>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        ingridients={ingridients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingridients={ingridients} />
                <BuildControls
                    ingridientAdded={this.addIngridientHandler}
                    ingridientRemove={this.removeIngrientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </AuxContainer>
        )
    }
}

export default BurgerBuilder
