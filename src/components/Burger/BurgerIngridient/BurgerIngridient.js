import React from 'react'

import classes from './BurgerIngredient.css'

const BurgerIngridient = props => {
    let ingrient = null

    switch (props.type) {
        case 'bread-bottom':
            ingrient = <div className={classes.BreadBottom} />
            break
        case 'bread-top':
            ingrient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1} />
                    <div className={classes.Seeds2} />
                </div>
            )
            break
        case 'meat':
            ingrient = <div className={classes.Meat} />
            break
        case 'cheese':
            ingrient = <div className={classes.Cheese} />
            break
        case 'salad':
            ingrient = <div className={classes.Salad} />
            break
        case 'bacon':
            ingrient = <div className={classes.Bacon} />
            break
        default:
            ingrient = null
    }

    return ingrient
}

export default BurgerIngridient
