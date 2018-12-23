import React from 'react'
import classes from './Burger.css'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient'

const Burger = props => {
    const transformIngridients = Object.keys(props.ingridients).map(igKey => {
        return [...Array(props.ingridients[igKey])].map((_, i) => (
            <BurgerIngridient key={igKey + i} type={igKey} />
        ))
    })

    return (
        <div className={classes.Burger}>
            <h2>Please start adding ingridients</h2>
            <BurgerIngridient type="bread-top" />
            {transformIngridients}
            <BurgerIngridient type="bread-bottom" />
        </div>
    )
}

export default Burger
