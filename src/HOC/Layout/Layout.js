import React, { Component } from 'react'
import AuxContainer from '../AuxContainer/auxContainer'

import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHendler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandle = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <AuxContainer>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandle} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHendler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </AuxContainer>
        )
    }
}

export default Layout
