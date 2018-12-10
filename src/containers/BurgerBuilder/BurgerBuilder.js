import React, { Component } from 'react'
import AuxContainer from '../../HOC/auxContainer'

class BurgerBuilder extends Component {
    render() {
        return (
            <AuxContainer>
                <div>Burger</div>
                <div>Build Controls</div>
            </AuxContainer>
        )
    }
}

export default BurgerBuilder
