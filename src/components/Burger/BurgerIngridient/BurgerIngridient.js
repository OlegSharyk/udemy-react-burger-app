import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from './BurgerIngredient.css'

class BurgerIngridient extends Component {
    render() {
        const { type } = this.props
        let ingridient = null

        switch (type) {
            case 'bread-bottom':
                ingridient = <div className={classes.BreadBottom} />
                break
            case 'bread-top':
                ingridient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1} />
                        <div className={classes.Seeds2} />
                    </div>
                )
                break
            case 'meat':
                ingridient = <div className={classes.Meat} />
                break
            case 'cheese':
                ingridient = <div className={classes.Cheese} />
                break
            case 'salad':
                ingridient = <div className={classes.Salad} />
                break
            case 'bacon':
                ingridient = <div className={classes.Bacon} />
                break
            default:
                ingridient = null
        }
        return ingridient
    }
}

BurgerIngridient.propTypes = {
    type: PropTypes.string.isRequired,
}

export default BurgerIngridient
