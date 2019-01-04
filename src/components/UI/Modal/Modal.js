import React, { Component } from 'react'
import classes from './Modal.css'
import AuxContainer from '../../../HOC/AuxContainer/auxContainer'
import Backdrop from '../Backdrop/Backdrop'

// TODO: check maybe we can use PureComponents
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        // if (nextProps.show !== this.state.show) {
        //     return true
        // }
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentWillUpdate() {
        console.log('[MODAL] willUpdate')
    }

    render() {
        return (
            <AuxContainer>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </AuxContainer>
        )
    }
}

export default Modal
