import React, { Component } from 'react'
import AuxContainer from '../../HOC/AuxContainer/auxContainer'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'


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
        ingridients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://os-react-burger-app.firebaseio.com/ingridients.json')
            .then(response => {
                this.setState({ingridients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
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
        // alert('you continue')
        this.setState({loading: true});
        const order = {
            ingridients: this.state.ingridients,
            price: this.state.totalPrice,
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
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
            })
    }

    render() {
        const { ingridients, loading, error } = this.state

        const disableInfo = {
            ...this.state.ingridients,
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        // {salad:true, meat: false, chease: true, bacon: true}
        let summaryOrder = null;
        let burger = error ? <p>Ingridients can't be loaded!</p> : <Spinner />

        if (ingridients) {
            burger =  (
                <AuxContainer>
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
            summaryOrder = <OrderSummary
                price={this.state.totalPrice}
                ingridients={ingridients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                />
        }

        if (loading) {
            summaryOrder = <Spinner />
        }

        return (
            <AuxContainer>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {summaryOrder}
                </Modal>
                {burger}
            </AuxContainer>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)
