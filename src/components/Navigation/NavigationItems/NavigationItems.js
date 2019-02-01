import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">
            Burger Builder
        </NavigationItem>
        {/*<NavigationItem link="/">Checkout</NavigationItem>*/}
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default NavigationItems
