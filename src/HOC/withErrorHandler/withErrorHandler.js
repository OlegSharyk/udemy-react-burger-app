import React, {Component} from 'react'

import Modal from '../../components/UI/Modal/Modal'
import AuxContainer from '../AuxContainer/auxContainer'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state= {
            error: null
        }

        componentWillMount() {
            this.reqInterсeptor = axios.interceptors.request.use(req => {
                this.setState({ error: null})
                return req;
            })
            this.resInterсeptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterсeptor)
            axios.interceptors.response.eject(this.resInterсeptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            const {error} = this.state

            return (
                <AuxContainer>
                    <Modal 
                        show={error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {error ? error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </AuxContainer>
            ); 
        }
    }
};

export default withErrorHandler;