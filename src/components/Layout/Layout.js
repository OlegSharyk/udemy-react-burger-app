import React from 'react'
import AuxContainer from '../../HOC/auxContainer'

import classes from './Layout.css'

const Layout = props => (
    <AuxContainer>
        {console.log(classes)}
        <div>Toolbar, SideDrawer, BackDrop</div>
        <main className={classes.Content}>{props.children}</main>
    </AuxContainer>
)

export default Layout
